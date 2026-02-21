// Импорт компонента карты и типа события нажатия
import MapView, { MapPressEvent } from "react-native-maps";

// Импорт кастомного хука для работы с маркерами
import { useMarkers } from "../_layout";

// Импорт компонента, который отображает список маркеров
import MarkerList from "./MarkerList";

// Компонент карты
export default function Map() {

  // Получаем массив маркеров и функцию добавления маркера из контекста
  const { markers, addMarker } = useMarkers();

  // Обработчик долгого нажатия на карту
  const handleLongPress = (event: MapPressEvent) => {

    // Получаем координаты точки, куда нажал пользователь
    const { latitude, longitude } = event.nativeEvent.coordinate;

    // Добавляем новый маркер по этим координатам
    addMarker(latitude, longitude);
  };

  return (
    <MapView
      style={{ flex: 1 }} // Карта занимает весь экран
      onLongPress={handleLongPress} // Обработчик долгого нажатия
      initialRegion={{ // Начальная область отображения карты
        latitude: 52.37, // Начальная широта
        longitude: 4.89, // Начальная долгота
        latitudeDelta: 0.05, // Масштаб по широте
        longitudeDelta: 0.05, // Масштаб по долготе
      }}
    >
      {/* Отображение всех маркеров на карте */}
      <MarkerList markers={markers} />
    </MapView>
  );
}