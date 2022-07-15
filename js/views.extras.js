import { createViewElement } from "./methos.create.view.js";
import { UserPersistence } from "./control.user.sesion.js";

export class ViewsExtras {

    #userPersistence = new UserPersistence();
    #bodyDocument = document.getElementById("body");
    msjFailedAnswer = "Nooooo! en esta ocasion la respuesta no fue correcta!";
    msjCongratulations = "Felicitaciones !! Lograste llegar al final, eres el(la) mejor!"

    /**
     * @param {showDialogddUser} showDialogddUser Muestra un cuadro de dialogo al usuario con un input 
     * para que ingrese el nombre a guardar en el juego
     */
    showDialogaddUser = () => {
        let dialog = createViewElement('div', 'dialog');
        let dialogBody = createViewElement('div', 'dialog_body');

        let dialogImg = createViewElement('img', null);
        dialogImg.src = 'images/undraw_personal_info.svg';
        dialogBody.setAttribute('alt', 'Image personal info');
        dialogImg.style = "width: 100%; margin-bottom: 20px;"

        let formNameUser = createViewElement('form', null);
        formNameUser.action = 'javascript: return false;';

        let label = createViewElement('label', null);
        label.setAttribute('for', 'name_user');
        label.innerHTML = 'Nos gustaria saber como te llamas';

        let input = createViewElement('input', null);
        input.setAttribute('type', 'text');
        input.setAttribute('name', 'name_user');
        input.setAttribute('id', 'name_user');
        input.setAttribute('placeholder', 'Ej: Arnold Schwarzenegger');
        input.setAttribute('required', '');
        input.style = "width: 90%"

        let button = createViewElement('button', null);
        button.setAttribute('type', 'submit');
        button.innerHTML = 'Empezar a jugar';

        formNameUser.append(dialogImg, label, input, button);
        dialogBody.append(formNameUser);
        dialog.append(dialogBody);

        formNameUser.addEventListener('submit', () => {
            this.#userPersistence.addUser(dialog);
            this.showToast("Bienvenido(a) " + input.value);

            // Agrega el nombre a la pantalla principal
            document.getElementsByClassName('name_user')[0].innerHTML = input.value;
        });

        this.#bodyDocument.append(dialog);
    };

    /**
     * @param {msj} msj Mensaje a mostrar en la pantalla tipo toast https://www.sgoliver.net/blog/notificaciones-en-android-i-toast/
     */
    showToast = (msj) => {
        let toast = createViewElement('div', 'toast');
        let bodyToast = createViewElement('div', 'toast_body');
        let msjToast = createViewElement('span', 'toast_msj');
        msjToast.innerHTML = msj;

        bodyToast.append(msjToast);
        toast.append(bodyToast);

        this.#bodyDocument.append(toast);
        setTimeout(() => {
            this.#bodyDocument.removeChild(toast);
        }, 3000);
    }

    /**
     * @param {msj} msj Mensaje a mostrar en el dialog 
     */
    showDialogProcessors(msj) {

        let dialog = createViewElement('div', 'dialog');
        let dialogBody = createViewElement('div', 'dialog_body');

        let dialogImg = createViewElement('img', null);
        dialogImg.src = 'images/undraw_to_do.svg';
        dialogBody.setAttribute('alt', 'Image loading');

        let spanDialog = createViewElement('span', 'dialog_body-msj');
        spanDialog.innerHTML = msj;

        dialogBody.append(dialogImg, spanDialog);
        dialog.append(dialogBody);
        this.#bodyDocument.append(dialog);

        return dialog;
    }

    /**
     * @method showDialogCongratulation Muestra un cuadro de dialogo felicitando he informando al usuario que a ganado el juego.
     */
    showDialogCongratulation() {

        let dialog = createViewElement('div', 'dialog');
        let dialogBody = createViewElement('div', 'dialog_body');

        let dialogImg = createViewElement('img', null);
        dialogImg.src = 'images/undraw_celebrating.svg';
        dialogBody.setAttribute('alt', 'Image celebration');

        let spanDialog = createViewElement('span', 'dialog_body-title');
        spanDialog.innerHTML = this.msjCongratulations;

        let buttonDialog = createViewElement('button', null);
        buttonDialog.innerHTML = 'Jugar nuevamente';
        buttonDialog.addEventListener('click', () => { this.#bodyDocument.removeChild(dialog); });

        dialogBody.append(dialogImg, spanDialog, buttonDialog);
        dialog.append(dialogBody);
        this.#bodyDocument.appendChild(dialog);
    }

    /**
     * @method showDialogGameOver Muestra un cuadro de dialogo en el cual indica al usuario que a perdido.
     */
    showDialogGameOver() {

        let dialog = createViewElement('div', 'dialog');
        let dialogBody = createViewElement('div', 'dialog_body');

        let dialogImg = createViewElement('img', null);
        dialogImg.src = 'images/undraw_access_denied.svg';
        dialogBody.setAttribute('alt', 'Image game over');

        let spanDialog = createViewElement('span', 'dialog_body-title');
        spanDialog.innerHTML = this.msjFailedAnswer;

        let buttonDialog = createViewElement('button', null);
        buttonDialog.innerHTML = 'Jugar nuevamente';
        buttonDialog.addEventListener('click', () => { this.#bodyDocument.removeChild(dialog); });

        dialogBody.append(dialogImg, spanDialog, buttonDialog);
        dialog.append(dialogBody);
        this.#bodyDocument.appendChild(dialog);
    }

}