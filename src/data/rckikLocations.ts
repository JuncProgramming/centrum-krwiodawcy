import type { LatLngBoundsExpression } from 'leaflet';
import type { RCKiKLocation } from '@/types';

export const polandBounds: LatLngBoundsExpression = [
  [47.0, 12.0],
  [58.5, 26.5]
];

export const rckikLocations: RCKiKLocation[] = [
  {
    name: 'RCKiK Warszawa',
    address: 'ul. Saska 63/75, 03-948 Warszawa',
    phone: '22 514 60 00',
    website: 'https://www.rckik-warszawa.com.pl',
    mapCoords: [52.232741, 21.059879],
    googleMapsUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJ3zgawKjNHkcRrDcBzPUsEyk'
  },
  {
    name: 'RCKiK Kraków',
    address: 'ul. Rzeźnicza 11, 31-540 Kraków',
    phone: '12 261 88 20',
    website: 'https://www.rckik.krakow.pl',
    mapCoords: [50.0561145, 19.956245],
    googleMapsUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJUw6w3T5bFkcRXZgiVb39IDE'
  },
  {
    name: 'RCKiK Wrocław',
    address: 'ul. Czerwonego Krzyża 5-9, 50-345 Wrocław',
    phone: '71 371 58 10',
    website: 'https://www.rckik.wroclaw.pl',
    mapCoords: [51.115785, 17.065316],
    googleMapsUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJwTQxFC3oD0cRKwyAHYp6Eug'
  },
  {
    name: 'RCKiK Poznań',
    address: 'ul. Marcelińska 44, 60-354 Poznań',
    phone: '61 886 33 00',
    website: 'https://www.rckik.poznan.pl',
    mapCoords: [52.404273, 16.883234],
    googleMapsUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJP5zEUdtEBEcRyQgGCbLgTic'
  },
  {
    name: 'RCKiK Gdańsk',
    address: 'ul. J. Hoene-Wrońskiego 4, 80-210 Gdańsk',
    phone: '58 308 16 00',
    website: 'https://www.krew.gda.pl',
    mapCoords: [54.365799, 18.629513],
    googleMapsUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJ3ftvWH1z_UYRybGaIUChfys'
  },
  {
    name: 'RCKiK Łódź',
    address: 'ul. Franciszkańska 17/25, 91-433 Łódź',
    phone: '42 616 14 00',
    website: 'https://www.krwiodawstwo.pl',
    mapCoords: [51.78223, 19.461492],
    googleMapsUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJfw_Ym97KG0cRhvuAUEgmov0'
  },
  {
    name: 'RCKiK Katowice',
    address: 'ul. Raciborska 15, 40-074 Katowice',
    phone: '32 208 73 00',
    website: 'https://www.rckik-katowice.pl',
    mapCoords: [50.255626, 19.006613],
    googleMapsUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJ35Jn3UPOFkcRqLB12TSaOUk'
  },
  {
    name: 'RCKiK Lublin',
    address: 'ul. Żołnierzy Niepodległej 8, 20-078 Lublin',
    phone: '81 532 62 75',
    website: 'https://www.rckik.lublin.pl',
    mapCoords: [51.248638, 22.556418],
    googleMapsUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJse810WdXIkcRPI0SfhW4qYc'
  },
  {
    name: 'RCKiK Białystok',
    address: 'ul. Marii Skłodowskiej-Curie 23, 15-950 Białystok',
    phone: '85 744 70 02',
    website: 'https://www.rckik.bialystok.pl',
    mapCoords: [53.125846, 23.162946],
    googleMapsUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJvy1MjQH8H0cRVrvMO-gSWik'
  },
  {
    name: 'RCKiK Szczecin',
    address: 'al. Wojska Polskiego 80/82, 70-482 Szczecin',
    phone: '91 424 36 00',
    website: 'https://www.krwiodawstwo.szczecin.pl',
    mapCoords: [53.436243, 14.536116],
    googleMapsUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJ9bWrpDgJqkcRfJUj1BLRPw0'
  },
  {
    name: 'RCKiK Bydgoszcz',
    address: 'ul. Ks. Markwarta 8, 85-015 Bydgoszcz',
    phone: '52 322 18 71',
    website: 'https://www.rckik-bydgoszcz.com.pl',
    mapCoords: [53.126079, 18.01106],
    googleMapsUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJmc-TYpUTA0cRo5uqADN-umE'
  },
  {
    name: 'RCKiK Olsztyn',
    address: 'ul. Malborska 2, 10-255 Olsztyn',
    phone: '89 526 01 56',
    website: 'https://www.rckikol.pl',
    mapCoords: [53.793352, 20.489837],
    googleMapsUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJcWFmdLZ-4kYRTrP20CGTRC0'
  },
  {
    name: 'RCKiK Rzeszów',
    address: 'ul. Wierzbowa 14, 35-310 Rzeszów',
    phone: '17 867 20 30',
    website: 'https://www.rckk.rzeszow.pl',
    mapCoords: [50.0336162, 22.0149808],
    googleMapsUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJ0x7Xdfn6PEcRJHeHQDIy9ps'
  },
  {
    name: 'RCKiK Kielce',
    address: 'ul. Jagiellońska 66, 25-734 Kielce',
    phone: '41 335 94 00',
    website: 'https://www.rckik-kielce.com.pl',
    mapCoords: [50.873113, 20.605239],
    googleMapsUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJ687SU-MnGEcRHcLbndoUGr0'
  },
  {
    name: 'RCKiK Opole',
    address: 'ul. Kośnego 55, 45-372 Opole',
    phone: '77 441 06 00',
    website: 'https://www.rckik-opole.com.pl',
    mapCoords: [50.670543, 17.939046],
    googleMapsUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJC5Fs8QlTEEcRTHWGV-agkf8'
  },
  {
    name: 'RCKiK Zielona Góra',
    address: 'ul. Zyty 21, 65-046 Zielona Góra',
    phone: '68 329 83 60',
    website: 'https://www.rckik.zgora.pl',
    mapCoords: [51.940245, 15.519251],
    googleMapsUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJza8AhdoTBkcRaxl21YktoPo'
  },
  {
    name: 'RCKiK Racibórz',
    address: 'ul. Sienkiewicza 3A, 47-400 Racibórz',
    phone: '32 418 15 92',
    website: 'https://www.rckik.pl',
    mapCoords: [50.088086, 18.219508],
    googleMapsUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJEcJC3R1oEUcRUTNJQCEMuXI'
  },
  {
    name: 'RCKiK Słupsk',
    address: 'ul. Szarych Szeregów 21, 76-200 Słupsk',
    phone: '59 842 20 21',
    website: 'https://www.krwiodawstwo.slupsk.pl',
    mapCoords: [54.4697752, 17.0326809],
    googleMapsUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJawmfEqQQ_kYR9P3d8T4EG6k'
  },
  {
    name: 'RCKiK Kalisz',
    address: 'ul. Kaszubska 9, 62-800 Kalisz',
    phone: '62 767 66 63',
    website: 'https://www.krwiodawstwo.kalisz.pl',
    mapCoords: [51.770187, 18.103548],
    googleMapsUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJ_Z7GgArFGkcRI7hTFvYM9yE'
  },
  {
    name: 'RCKiK Wałbrzych',
    address: 'ul. Chrobrego 31, 58-303 Wałbrzych',
    phone: '74 664 63 10',
    website: 'https://www.rckik.walbrzych.pl',
    mapCoords: [50.774127, 16.275105],
    googleMapsUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJ0cMti7dWDkcRrvuXGaB2liw'
  },
  {
    name: 'RCKiK Radom',
    address: 'ul. Limanowskiego 42, 26-600 Radom',
    phone: '48 340 05 20',
    website: 'https://www.rckik.radom.pl',
    mapCoords: [51.398039, 21.137331],
    googleMapsUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJa9dlozVZGEcRvJrBEVKakuk'
  }
];

export const polandCenter: [number, number] = [52.5, 19.0];
