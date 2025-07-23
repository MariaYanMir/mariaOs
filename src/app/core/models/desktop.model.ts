export enum Status {
  NORMAL = 'normal',
  MAX = 'max',
  MIN = 'min',
}

export interface AppInstance {
  id: string;
  title: string;
  iconName: string;

  // Posición y tamaño de ventana
  top?: number;
  left?: number;
  width?: string;
  height?: string;

  // Estado anterior (para restaurar desde MAX o MIN)
  previousTop?: number;
  previousLeft?: number;
  previousWidth?: string;
  previousHeight?: string;

  // Estado actual
  zIndex?: number;
  status: Status;
  isOpen: boolean;

  // En qué zonas aparece
  inDockBar: boolean;
  isExternal: boolean;

  // Posición en el grid del escritorio (solo iconos)
  position?: {
    gridColumn: number;
    gridRow: number;
  };
}
