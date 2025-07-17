'use client';

import { useCallback, useRef, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import { geoMercator } from 'd3-geo';

import { useIsMobile } from '@/hooks/use-is-mobile';
import type { Community } from '@/types/community';

const geoUrl = '/spain-provinces.geojson';

type TooltipContent =
  | { type: 'single'; community: Community }
  | { type: 'cluster'; communities: Community[] };

interface TooltipPosition {
  x: number;
  y: number;
}

interface SpainMapProps {
  communities: Community[];
  onHoverCommunity: (communityId: string | null) => void;
}

const formatCommunityName = (name: string) => {
  return name
    .replace(/[^\w\s]/g, '') // Elimina caracteres no alfanuméricos ni espacios
    .replace(/\s+/g, '-') // Reemplaza los espacios por guiones
    .toLowerCase(); // Convierte todo a minúsculas (opcional)
};

export default function SpainMap({
  communities,
  onHoverCommunity,
}: SpainMapProps) {
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipContent, setTooltipContent] = useState<TooltipContent | null>(
    null,
  );
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({
    x: 0,
    y: 0,
  });
  const isMobile = useIsMobile();

  // Dimensiones según dispositivo
  const width = isMobile ? 400 : 800;
  const height = isMobile ? 300 : 600;

  // Proyección para convertir coordenadas geográficas a píxeles - Configuración para España
  const projection = useMemo(
    () =>
      geoMercator()
        .scale(isMobile ? 1200 : 1800) // Escala ajustada para España
        .center([-3.5, 40.0]) // Centro de España (aproximadamente Madrid)
        .translate([width / 2, height / 2]),
    [isMobile, width, height],
  );

  // Clusterizamos las comunidades cercanas (en píxeles)
  const clusters = useMemo(() => {
    const clusterThreshold = 20; // Ajusta este valor según necesites
    const clusters: { x: number; y: number; communities: Community[] }[] = [];

    communities.forEach((community) => {
      if (!community.location) return;
      const coords = projection([
        community.location.lng,
        community.location.lat,
      ]);
      if (!coords) return;
      let added = false;
      for (const cluster of clusters) {
        const dx = coords[0] - cluster.x;
        const dy = coords[1] - cluster.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < clusterThreshold) {
          cluster.communities.push(community);
          // Recalcula el centro (promedio)
          cluster.x =
            (cluster.x * (cluster.communities.length - 1) + coords[0]) /
            cluster.communities.length;
          cluster.y =
            (cluster.y * (cluster.communities.length - 1) + coords[1]) /
            cluster.communities.length;
          added = true;
          break;
        }
      }
      if (!added) {
        clusters.push({ x: coords[0], y: coords[1], communities: [community] });
      }
    });
    return clusters;
  }, [communities, projection]);

  // Muestra el tooltip en la posición del marcador (únicamente con clic/tap)
  const handleMarkerClick = useCallback(
    (event: React.MouseEvent<SVGElement>, content: TooltipContent) => {
      // Evitamos que el clic se propague al contenedor del mapa
      event.stopPropagation();
      const marker = event.currentTarget;
      const mapContainer = mapRef.current;
      if (marker && mapContainer) {
        const markerRect = marker.getBoundingClientRect();
        const mapRect = mapContainer.getBoundingClientRect();
        setTooltipPosition({
          x: markerRect.left - mapRect.left + markerRect.width / 2,
          y: markerRect.top - mapRect.top,
        });
        setTooltipContent(content);
        if (content.type === 'single') {
          onHoverCommunity(content.community.slug);
        } else {
          onHoverCommunity(null);
        }
      }
    },
    [onHoverCommunity],
  );

  // Cierra el tooltip
  const closeTooltip = useCallback(() => {
    setTooltipContent(null);
    onHoverCommunity(null);
  }, [onHoverCommunity]);

  // Navega a la comunidad seleccionada y cierra el tooltip
  const navigateToCommunity = useCallback(
    (communityId: string) => {
      closeTooltip();
      router.push(`/community/${communityId}`);
    },
    [closeTooltip, router],
  );

  // Si el usuario toca fuera del tooltip, se cierra
  const handleMapClick = useCallback(
    (
      event:
        | React.MouseEvent<HTMLDivElement>
        | React.TouchEvent<HTMLDivElement>,
    ) => {
      if (
        tooltipRef.current &&
        event.target instanceof Node &&
        tooltipRef.current.contains(event.target)
      ) {
        return;
      }
      closeTooltip();
    },
    [closeTooltip],
  );

  return (
    <div
      ref={mapRef}
      className='relative w-full h-full flex items-center justify-center p-2 bg-card border border-border rounded-xl shadow-sm'
      onClick={handleMapClick}
      onTouchStart={handleMapClick}
    >
      <ComposableMap
        projection='geoMercator'
        projectionConfig={{
          scale: isMobile ? 1200 : 1800,
          center: [-3.5, 40.0],
        }} // Configuración para España
        width={width}
        height={height}
        className='w-full h-full'
      >
        <ZoomableGroup center={[-3.5, 40.0]} zoom={1} minZoom={1} maxZoom={8}>
          {' '}
          {/* Centro de España */}
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo, index) => (
                <Geography
                  key={geo.rsmKey || `geo-${index}`}
                  geography={geo}
                  className='fill-muted stroke-border transition-colors duration-200'
                  strokeWidth={0.8}
                  style={{
                    default: { outline: 'none' },
                    hover: {
                      fill: 'hsl(var(--muted)/0.9)',
                      transition: 'all 250ms',
                    },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>
          {clusters
            .filter((cluster) => {
              if (!projection.invert) return false;
              const geoCoords = projection.invert([cluster.x, cluster.y]);
              return geoCoords !== null;
            })
            .map((cluster, index) => {
              const geoCoords = projection.invert!([cluster.x, cluster.y]);

              if (cluster.communities.length === 1) {
                const community = cluster.communities[0];
                return (
                  <Marker
                    key={`single-${community.slug || community.name}`}
                    coordinates={[
                      community.location!.lng,
                      community.location!.lat,
                    ]}
                  >
                    <motion.circle
                      r={isMobile ? 4 : 5}
                      className='fill-primary stroke-primary-foreground hover:fill-primary/90 cursor-pointer'
                      strokeWidth={2}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                        delay: index * 0.05,
                      }}
                      onClick={(e) =>
                        handleMarkerClick(e, { type: 'single', community })
                      }
                    />
                  </Marker>
                );
              } else {
                return (
                  <Marker
                    key={`cluster-${cluster.x.toFixed(2)}-${cluster.y.toFixed(2)}-${cluster.communities.map((c) => c.slug || c.name).join('-')}`}
                    coordinates={geoCoords!}
                  >
                    <motion.g
                      className='cursor-pointer'
                      onClick={(e) =>
                        handleMarkerClick(e, {
                          type: 'cluster',
                          communities: cluster.communities,
                        })
                      }
                    >
                      <motion.circle
                        r={isMobile ? 8 : 10}
                        className='fill-primary stroke-primary-foreground hover:fill-primary/90'
                        strokeWidth={2}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: 'spring',
                          stiffness: 260,
                          damping: 20,
                          delay: index * 0.05,
                        }}
                      />
                      <text
                        textAnchor='middle'
                        y={isMobile ? 4 : 5}
                        className='font-bold text-primary-foreground text-xs pointer-events-none'
                        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                      >
                        {cluster.communities.length}
                      </text>
                    </motion.g>
                  </Marker>
                );
              }
            })}
        </ZoomableGroup>
      </ComposableMap>

      <AnimatePresence>
        {tooltipContent && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className='absolute z-50 bg-popover border border-border rounded-lg shadow-lg p-3 px-4 max-w-[250px] min-w-[150px] pointer-events-auto'
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
              transform: 'translate(-50%, -110%)',
            }}
          >
            <button
              className='absolute top-1 right-1 text-muted-foreground hover:text-foreground transition-colors'
              onClick={closeTooltip}
              aria-label='Close tooltip'
            >
              ×
            </button>
            {tooltipContent.type === 'single' ? (
              <div className='flex flex-col gap-2'>
                <p className='font-medium text-sm text-popover-foreground'>
                  {tooltipContent.community.name}
                </p>
                <p className='text-xs flex items-center gap-1 text-muted-foreground'>
                  <span className='w-2 h-2 rounded-full bg-primary' />
                  {tooltipContent.community.province}
                </p>
                <button
                  onClick={() =>
                    navigateToCommunity(
                      formatCommunityName(tooltipContent.community.name),
                    )
                  }
                  className='mt-2 px-3 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors'
                >
                  Seleccionar
                </button>
              </div>
            ) : (
              <div className='flex flex-col gap-2'>
                {tooltipContent.communities.map((comm: Community, index) => (
                  <div
                    key={`${comm.slug || comm.name}-${index}`}
                    className='cursor-pointer hover:underline p-1 rounded hover:bg-accent hover:text-accent-foreground transition-colors'
                    onClick={() =>
                      navigateToCommunity(formatCommunityName(comm.name))
                    }
                  >
                    <p className='font-medium text-sm text-popover-foreground'>
                      {comm.name}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      {comm.province}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
