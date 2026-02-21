// Импорт компонента Stack из expo-router для навигации между экранами
import { Stack } from "expo-router";

// Импорт React-хуков для создания контекста и управления состоянием
import { createContext, useContext, useState, ReactNode } from "react";

// Импорт типа маркера
import { MarkerItem } from "../app/types";

// Описание структуры данных, которые будут храниться в контексте
interface MarkerContextType {
  markers: MarkerItem[]; // Массив всех маркеров
  addMarker: (lat: number, lon: number) => void; // Функция добавления маркера
  removeMarker: (id: string) => void; // Функция удаления маркера
  addImage: (markerId: string, image: { id: string; uri: string }) => void; // Добавление изображения к маркеру
  removeImage: (markerId: string, imageId: string) => void; // Удаление изображения у маркера
}

// Создание контекста для маркеров (по умолчанию undefined)
const MarkerContext = createContext<MarkerContextType | undefined>(undefined);

// Кастомный хук для удобного использования контекста
export const useMarkers = () => {
  const ctx = useContext(MarkerContext); // Получаем текущее значение контекста
  if (!ctx) throw new Error("useMarkers must be used inside MarkerProvider"); // Защита от использования вне Provider
  return ctx; // Возвращаем данные контекста
};

// Главный layout-компонент, оборачивающий всё приложение
export default function Layout() {
  // Состояние, в котором хранятся все маркеры
  const [markers, setMarkers] = useState<MarkerItem[]>([]);

  // Функция добавления нового маркера
  const addMarker = (latitude: number, longitude: number) => {
    const newMarker: MarkerItem = {
      id: Date.now().toString(), // Генерация уникального ID
      latitude, // Широта
      longitude, // Долгота
      images: [], // Изначально без изображений
    };
    setMarkers(prev => [...prev, newMarker]); // Добавляем новый маркер в массив
  };

  // Функция удаления маркера по ID
  const removeMarker = (id: string) => {
    setMarkers(prev => prev.filter(m => m.id !== id)); // Удаляем маркер из массива
  };

  // Функция добавления изображения к конкретному маркеру
  const addImage = (markerId: string, image: { id: string; uri: string }) => {
    setMarkers(prev =>
      prev.map(m =>
        m.id === markerId // Если нашли нужный маркер
          ? { ...m, images: [...m.images, image] } // Добавляем изображение
          : m // Иначе оставляем без изменений
      )
    );
  };

  // Функция удаления изображения у конкретного маркера
  const removeImage = (markerId: string, imageId: string) => {
    setMarkers(prev =>
      prev.map(m =>
        m.id === markerId
          ? { ...m, images: m.images.filter(img => img.id !== imageId) } // Удаляем изображение по ID
          : m
      )
    );
  };

  // Возвращаем провайдер, который делает контекст доступным во всём приложении
  return (
    <MarkerContext.Provider
      value={{ markers, addMarker, removeMarker, addImage, removeImage }}> // Передаем состояние и функции
      <Stack /> {/* Компонент навигации */}
    </MarkerContext.Provider>
  );
}