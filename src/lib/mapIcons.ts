import L from 'leaflet';

export const mapPinIcon = new L.Icon({
  iconUrl:
    'data:image/svg+xml;base64,' +
    btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 72" width="48" height="72">
      <defs>
        <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.25"/>
        </filter>
      </defs>
      <g filter="url(#shadow)">
        <path fill="#DC2626" d="M24 0C10.745 0 0 10.745 0 24c0 18 24 48 24 48s24-30 24-48C48 10.745 37.255 0 24 0z"/>
        <circle fill="#FFFFFF" cx="24" cy="24" r="10"/>
      </g>
    </svg>
  `),
  iconSize: [36, 54],
  iconAnchor: [18, 54],
  popupAnchor: [0, -54]
});
