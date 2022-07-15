export class UserPersistence {

    /**
     * El metodo busca en el localStorage el valor pasado en keySearch y de no encontrarlo devuelve un valor 0
     * @param {keySearch} keySearch Valor a buscar en el localStorage
     */
    getDataUser(keySearch) {
        let valueTemp = window.localStorage.getItem(keySearch);
        if (valueTemp == undefined || valueTemp == null) valueTemp = 0;
        return valueTemp;
    }

    /**
     * Agrega un usuario al localStorage para guardar su progreso e identidicarlo
     * @param {dialog} dialog Recibe el dialogo de agregar nombre de usuario
     */
    addUser(dialog) {
        let nameUser = document.getElementById('name_user').value;
        window.localStorage.setItem('name_user', nameUser);

        let bodyTemp = document.getElementById('body');
        bodyTemp.removeChild(dialog);
    }

    /**
     * Este metodo se utiliza para guardar los valores en el localstorage y recuperar el progreso en caso tal
     * el usuario cierre la pagina accidentalmente o desee continuar despues.
     * @param {newLevel} newLevel Nuevo o ultimo nivel al que el usuario a llegado y continua jugando
     * @param {newScore} newScore Ultimo puntaje obtenido por el usuario
     */
    saveData(newLevel, newScore) {
        window.localStorage.setItem('level', newLevel);
        window.localStorage.setItem('score', newScore);
    }

    /**
     * Este metodo borra el progreso del usuario y por lo regular se  utiliza cuando el usuario pierde o llega al final 
     * del juego.
     */
    cleanData() {
        window.localStorage.setItem('level', 1);
        window.localStorage.setItem('score', 0);
    }
}