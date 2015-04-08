# ats-web

La home tiene algo de funcionalidad en JavaScript que sirve para hacer una presentación y podría ser usada para la versión funcional del sitio:

- El switch hotelería/gastronomía funciona.
- El input principal de búsqueda "funciona", al hacer una búsqueda que no sea vacía se cargan resultados de búsqueda dummy por ajax. La barra de búsqueda que aparece al tope de la ventana al hacer una búsqueda NO funciona.

Un par de problemitas, seguramente a ser solucionados por el programador:

- **intro-gastro-bg.jpg** y **intro-hotels-bg.jpg** deberían precargarse para evitar que la imagen cargue cuando se cambia el switch hotelería/gastronomía (queda horrible). Creo que el código actual NO está funcionando:

```javascript
function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
}

preload(['img/intro-gastro-bg.jpg','img/intro-hotels-bg.jpg',]);
```

- Se supone que el plugin [jquery-navigate](https://github.com/binarymind/jquery-navigate) debería agregar navegación por ajax automáticamente al navegar mediante anchor tags en el sitio, pero no parece estar funcionando. Sería muy piola que esto funcionara para mejorar la velocidad del sitio en mobile.