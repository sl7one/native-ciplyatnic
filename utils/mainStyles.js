export const theme = {
  colors: {
    orderLink: 'rgba(0, 255, 0, 0.2)',
    purchaseLink: 'rgba(0, 200, 255, 0.2)',
    salleLink: 'rgba(255, 255, 0, 0.2)',
    positiveButton: 'rgba(255, 0, 200, 0.7)',
    negativeButton: 'rgba(200, 0, 255, 0.7)',
    neutralButton: 'rgba(0,0,0, 0.05)',
    borderColor: 'rgba(0,0,0,0.2)',
    underlayColor: 'rgba(0,0,0,0.05)',
    text: 'rgba(0,0,0,0.8)',
  },
  activeOpacity: 0.9,
};

export const container = {
  flex: 1,
};

export const text = {
  fontSize: 16,
  color: theme.colors.text,
};

export const headers = {
  fontSize: 24,
};

export const mainBox = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  height: 150,
};

export const modalView = {
  flex: 1,
  height: 700,
  margin: 5,
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 10,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
};

export const input = {
  padding: 5,
  height: 40,
  borderRadius: 5,
  borderWidth: 0.5,
  borderColor: theme.colors.borderColor,
};
