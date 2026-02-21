// Импорт компонента Marker для отображения маркеров на карте
import { Marker } from "react-native-maps";

// Импорт хука для навигации между экранами
import { useRouter } from "expo-router";

// Импорт типа маркера
import { MarkerItem } from "../types";

// Описание пропсов компонента
interface Props {
  markers: MarkerItem[]; // Массив маркеров, которые нужно отобразить
}

// Компонент, отображающий список маркеров на карте
export default function MarkerList({ markers }: Props) {

  // Получаем объект навигации
  const router = useRouter();

  return (
    <>
      {/* Проходим по массиву маркеров и создаём Marker для каждого */}
      {markers.map(marker => (
        <Marker
          key={marker.id} // Уникальный ключ для React
          coordinate={{
            latitude: marker.latitude, // Широта маркера
            longitude: marker.longitude, // Долгота маркера
          }}
          onPress={() =>
            // При нажатии переходим на экран деталей маркера
            router.push({
              pathname: "/marker/[id]", // Динамический маршрут
              params: { id: marker.id }, // Передаём ID маркера
            })
          }
        />
      ))}
    </>
  );
}