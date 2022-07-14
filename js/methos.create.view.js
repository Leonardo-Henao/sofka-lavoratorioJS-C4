/**
 * @param {typeElement} typeElement Tipo de elemento a crear en el DOM como un div, span, p, a, section o cualquier otra etiqueta HTML
 * @param {className} className Nombre de la clase que se le va a agregar al elemento. Puede ser un elemento nulo.
 */
export const createViewElement = (typeElement, className) => {
    let element = document.createElement(typeElement);
    if (className != null) element.setAttribute('class', className);
    return element;
}