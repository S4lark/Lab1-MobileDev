// Интерфейс одного изображения, привязанного к маркеру
export interface ImageItem {
  id: string; // Уникальный идентификатор изображения
  uri: string; // Путь (URI) к изображению в памяти устройства
}

// Интерфейс маркера на карте
export interface MarkerItem {
  id: string; // Уникальный идентификатор маркера
  latitude: number; // Широта маркера
  longitude: number; // Долгота маркера
  images: ImageItem[]; // Массив изображений, прикрепленных к маркеру
}