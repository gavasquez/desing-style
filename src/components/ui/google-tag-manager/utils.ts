export const GTM = {
  // Inicializar dataLayer
  initialize: (w: Window): void => {
    w.dataLayer = w.dataLayer || [];
  },

  // Registrar una vista de página
  pageview: (url: string): void => {
    if (typeof window !== 'undefined') {
      window.dataLayer.push({
        event: 'pageview',
        page: url,
      });
    }
  },

  // Registrar un evento personalizado
  event: (name: string, params: Record<string, any> = {}): void => {
    if (typeof window !== 'undefined') {
      window.dataLayer.push({
        event: name,
        ...params,
      });
    }
  },
};