import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { BaseDashboardCard } from '@/components/dashboard/BaseDashboardCard';
import { Globe, Phone, MapPin, X } from 'lucide-react';
import {
  rckikLocations,
  polandCenter,
  polandBounds
} from '@/data/rckikLocations';
import { mapPinIcon } from '@/lib/mapIcons';
import { buildGoogleMapsLink } from '@/utils';

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
          {rckikLocations.map((location) => {
            const coordinates: [number, number] = [
              location.mapCoords[1],
              location.mapCoords[0]
            ];
            const googleMapsLink = buildGoogleMapsLink(
              coordinates,
              location.placeId
            );

            return (
              <Marker
                key={location.placeId}
                position={location.mapCoords}
                icon={mapPinIcon}
              >
                <Popup
                  className='rckik-popup'
                  autoPanPadding={[20, 20]}
                  closeButton={false}
                >
                  <div className='relative min-w-60'>
                    <button
                      type='button'
                      aria-label='Zamknij szczegóły'
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        mapRef.current?.closePopup();
                      }}
                      className='absolute top-0 right-0 p-4 rounded-md text-zinc-600 hover:text-zinc-800 transition-colors cursor-pointer'
                    >
                      <X size={18} aria-hidden='true' />
                    </button>
                    <h4 className='font-semibold text-zinc-800 text-base leading-tight mb-3 pr-12'>
                      {location.name}
                    </h4>
                    <address className='pr-12'>
                      <div className='flex items-start gap-2.5 text-zinc-600 text-sm mb-1.5'>
                        <MapPin
                          className='mt-0.5 shrink-0 text-zinc-400'
                          size={15}
                          aria-hidden='true'
                        />
                        <span>{location.address}</span>
                      </div>
                      <div className='flex items-center gap-2.5 text-zinc-600 text-sm mb-1.5'>
                        <Phone
                          className='shrink-0 text-zinc-400'
                          size={15}
                          aria-hidden='true'
                        />
                        <span>{location.phone}</span>
                      </div>
                      <div className='flex items-center gap-2.5 text-zinc-600 text-sm mb-4'>
                        <Globe
                          className='shrink-0 text-zinc-400'
                          size={15}
                          aria-hidden='true'
                        />
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
                    </address>
                    <a
                      href={googleMapsLink}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center font-semibold justify-center w-full bg-red-600 hover:bg-red-700 text-white! text-sm py-2.5 px-4 rounded-lg transition-colors no-underline'
                    >
                      Pokaż trasę w Google Maps
                    </a>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
      <p className='text-xs text-zinc-500 mt-4'>
        Kliknij na marker, aby zobaczyć szczegóły punktu
      </p>
    </BaseDashboardCard>
  );
}

export default RCKiKMapCard;
