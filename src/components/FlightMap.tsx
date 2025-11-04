import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Plane } from 'lucide-react';

const FlightMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    // São Paulo coordinates
    const origin = [-46.6333, -23.5505];
    // Cancún coordinates
    const destination = [-86.8515, 21.1619];

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-66.7425, 2.1562], // Midpoint
      zoom: 3,
    });

    map.current.on('load', () => {
      // Add route line
      map.current?.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [origin, destination]
          }
        }
      });

      map.current?.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': 'hsl(199, 89%, 48%)',
          'line-width': 3,
          'line-dasharray': [2, 2]
        }
      });

      // Add markers
      new mapboxgl.Marker({ color: 'hsl(199, 89%, 48%)' })
        .setLngLat(origin as [number, number])
        .setPopup(new mapboxgl.Popup().setHTML('<strong>GRU - São Paulo</strong><br>Partida: 01:00 AM'))
        .addTo(map.current!);

      new mapboxgl.Marker({ color: 'hsl(24, 95%, 53%)' })
        .setLngLat(destination as [number, number])
        .setPopup(new mapboxgl.Popup().setHTML('<strong>CUN - Cancún</strong><br>Chegada: 10:12 AM'))
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  if (!mapboxToken) {
    return (
      <div className="relative w-full h-[500px] bg-card rounded-xl shadow-lg flex items-center justify-center">
        <div className="text-center p-6 max-w-md">
          <Plane className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h3 className="text-lg font-semibold mb-2">Configure o Mapa</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Para visualizar a rota do voo, insira sua chave pública do Mapbox abaixo.
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Obtenha sua chave em: <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
          </p>
          <input
            type="text"
            placeholder="Cole sua chave do Mapbox aqui"
            className="w-full px-4 py-2 rounded-lg border border-input bg-background text-sm"
            onChange={(e) => setMapboxToken(e.target.value)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-lg">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm px-4 py-3 rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <Plane className="w-5 h-5 text-primary" />
          <span className="font-semibold text-foreground">Rota de Voo</span>
        </div>
        <p className="text-sm text-muted-foreground">GRU → CUN</p>
        <p className="text-xs text-muted-foreground mt-1">Duração estimada: ~9h</p>
      </div>
    </div>
  );
};

export default FlightMap;
