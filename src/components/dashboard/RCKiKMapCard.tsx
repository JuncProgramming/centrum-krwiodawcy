import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { BaseDashboardCard } from './BaseDashboardCard';
import {
  rckikLocations,
  polandCenter,
  polandBounds
} from '@/data/rckikLocations';
import { mapPinIcon } from '@/lib/mapIcons';

export function RCKiKMapCard() {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 100);
    }
  }, []);

  return (
    <BaseDashboardCard title='Placówki RCKiK'>
      <p className='text-sm text-zinc-600 mb-3'>
        Znajdź najbliższy punkt Regionalnego Centrum Krwiodawstwa i
        Krwiolecznictwa
      </p>
      <div className='h-[400px] w-full rounded-lg overflow-hidden border border-zinc-200 relative z-0'>
        <MapContainer
          center={polandCenter}
          zoom={6}
          minZoom={6}
          maxBounds={polandBounds}
          maxBoundsViscosity={1.0}
          className='h-full w-full'
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {rckikLocations.map((location, index) => (
            <Marker key={index} position={location.mapCoords} icon={mapPinIcon}>
              <Popup className='rckik-popup'>
                <div className='min-w-60'>
                  <h4 className='font-semibold text-zinc-800 text-base leading-tight mb-3 pr-12'>
                    {location.name}
                  </h4>
                  <div className='pr-12'>
                    <div className='flex items-start gap-2.5 text-zinc-600 text-sm mb-1.5'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='15'
                        height='15'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='mt-0.5 shrink-0 text-zinc-400'
                      >
                        <path d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z' />
                        <circle cx='12' cy='10' r='3' />
                      </svg>
                      <span>{location.address}</span>
                    </div>
                    <div className='flex items-center gap-2.5 text-zinc-600 text-sm mb-1.5'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='15'
                        height='15'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='shrink-0 text-zinc-400'
                      >
                        <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
                      </svg>
                      <span>{location.phone}</span>
                    </div>
                    <div className='flex items-center gap-2.5 text-zinc-600 text-sm mb-4'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='15'
                        height='15'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='shrink-0 text-zinc-400'
                      >
                        <circle cx='12' cy='12' r='10' />
                        <path d='M2 12h20' />
                        <path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' />
                      </svg>
                      <a
                        href={location.website}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-red-600 hover:text-red-700 hover:underline'
                      >
                        {location.website
                          .replace('https://www.', '')
                          .replace('https://', '')}
                      </a>
                    </div>
                  </div>
                  <a
                    href={location.googleMapsUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center font-semibold justify-center w-full bg-red-600 hover:bg-red-700 text-white! text-sm py-2.5 px-4 rounded-lg transition-colors no-underline'
                  >
                    Pokaż trasę w Google Maps
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <p className='text-xs text-zinc-500 mt-4'>
        Kliknij na marker, aby zobaczyć szczegóły punktu
      </p>
    </BaseDashboardCard>
  );
}

export default RCKiKMapCard;
