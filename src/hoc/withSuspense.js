import React from 'react';


export const withSuspense = (Component) => { //принимает на вход компонент и возвращает другой компонент
  return (props) => {
    return  <React.Suspense fallback={<div>Загрузка...</div>}>
              <Component {...props} />
            </React.Suspense>
  }
}