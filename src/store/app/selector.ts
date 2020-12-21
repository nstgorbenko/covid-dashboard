import { StateInterface } from '@/types/entities';

export const getCountry = (state: StateInterface) => state['APP'].country;
export const getParameter = (state: StateInterface) => state['APP'].parameter;
export const getActiveScreen = (state: StateInterface) => state['APP'].activeScreen;
