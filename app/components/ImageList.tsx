// Импорт необходимых компонентов из React Native
import { View, Image, Button, FlatList, StyleSheet } from "react-native";

// Импорт типа изображения
import { ImageItem } from "../types";

// Описание пропсов компонента
interface Props {
  images: ImageItem[]; // Массив изображений для отображения
  onRemove: (id: string) => void; // Функция удаления изображения по ID
}

// Компонент для отображения списка изображений
export default function ImageList({ images, onRemove }: Props) {
  return (
    <FlatList
      data={images} // Данные для списка (массив изображений)
      keyExtractor={item => item.id} // Уникальный ключ для каждого элемента
      renderItem={({ item }) => ( // Отрисовка каждого элемента списка
        <View style={styles.item}>
          {/* Отображение изображения по его URI */}
          <Image source={{ uri: item.uri }} style={styles.image} />
          
          {/* Кнопка удаления изображения */}
          <Button title="Удалить" onPress={() => onRemove(item.id)} />
        </View>
      )}
    />
  );
}

// Создание стилей компонента
const styles = StyleSheet.create({
  item: { 
    marginVertical: 10, // Отступ сверху и снизу у каждого элемента
  },
  image: { 
    width: "100%", // Изображение занимает всю ширину контейнера
    height: 200, // Фиксированная высота изображения
    borderRadius: 10, // Скругление углов
  },
});