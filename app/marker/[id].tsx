// Импорт хуков для получения параметров маршрута и навигации
import { useLocalSearchParams, useRouter } from "expo-router";

// Импорт базовых компонентов React Native
import { View, Text, Button, Alert } from "react-native";

// Импорт библиотеки для выбора изображений из галереи
import * as ImagePicker from "expo-image-picker";

// Импорт хука для работы с маркерами из контекста
import { useMarkers } from "../_layout";

// Импорт компонента списка изображений
import ImageList from "../components/ImageList";

// Экран деталей маркера
export default function MarkerDetails() {

  // Получаем ID маркера из параметров маршрута
  const { id } = useLocalSearchParams<{ id: string }>();

  // Хук навигации
  const router = useRouter();

  // Получаем маркеры и функции управления ими
  const { markers, addImage, removeImage, removeMarker } = useMarkers();

  // Находим нужный маркер по ID
  const marker = markers.find(m => m.id === id);

  // Если маркер не найден — выводим сообщение
  if (!marker) return <Text>Маркер не найден</Text>;

  // Функция выбора изображения из галереи
  const pickImage = async () => {

    // Открываем галерею
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Разрешаем только изображения
    });

    // Если пользователь не отменил выбор
    if (!result.canceled) {

      // Добавляем изображение к текущему маркеру
      addImage(marker.id, {
        id: Date.now().toString(), // Генерация уникального ID
        uri: result.assets[0].uri, // Путь к выбранному изображению
      });
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      
      {/* Отображение координат маркера */}
      <Text>Широта: {marker.latitude}</Text>
      <Text>Долгота: {marker.longitude}</Text>

      {/* Кнопка добавления изображения */}
      <Button title="Добавить изображение" onPress={pickImage} />

      {/* Список изображений маркера */}
      <ImageList
        images={marker.images}
        onRemove={(imgId) => removeImage(marker.id, imgId)}
      />

      {/* Кнопка удаления маркера с подтверждением */}
      <Button
        title="Удалить маркер"
        color="red"
        onPress={() => {
          Alert.alert(
            "Удаление",
            "Вы уверены, что хотите удалить этот маркер?",
            [
              { text: "Отмена", style: "cancel" }, // Закрыть окно
              {
                text: "Удалить",
                style: "destructive",
                onPress: () => {
                  removeMarker(marker.id); // Удаляем маркер
                  router.back(); // Возвращаемся назад
                },
              },
            ]
          );
        }}
      />

    </View>
  );
}