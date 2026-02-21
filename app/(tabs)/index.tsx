// Импорт базовых компонентов из React Native
import { View, StyleSheet } from "react-native";

// Импорт компонента карты
import Map from "../components/Map";

// Главный экран приложения (отображает карту)
export default function Index() {
  return (
    // Контейнер, занимающий всё доступное пространство экрана
    <View style={styles.container}>
      {/* Компонент карты с маркерами */}
      <Map />
    </View>
  );
}

// Создание объекта стилей
const styles = StyleSheet.create({
  container: { 
    flex: 1, // Заставляет контейнер растягиваться на весь экран
  },
});