import { create } from "zustand";

interface TempCameraStoreState {
  selectedImages: string[]

  addSelectedImage: (image: string) => void;
  clearImages: () => void;

}

export const useCameraStore = create<TempCameraStoreState>()(( set ) => ({
  selectedImages: [],
  addSelectedImage: (image) => {
    set( (state) => ({ selectedImages: [...state.selectedImages, image]}) )
  },
  clearImages: () => set({selectedImages: []})
}))