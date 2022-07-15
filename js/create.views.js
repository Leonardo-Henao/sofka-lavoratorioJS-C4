import { createViewElement } from "./methos.create.view.js";
import { GameControl } from "./control.data.server.js";
import { UserPersistence } from "./control.user.sesion.js";
import { ViewsExtras } from "./views.extras.js";

/**
 * @method mView Crea los elementos o vistas principales del aplicativo web.
 */
export const mView = () => {

    const controlGame = new GameControl();
    const userPersistence = new UserPersistence();
    const mViewsExtras = new ViewsExtras();

    const bodyDocument = document.getElementById("body");
    const containerPrincipal = document.getElementById("container");
    const containerBody = createViewElement('div', 'container_body');
    const txtLoading = "Loading...";

    const msjLoadQuestions = "Un momento, estamos buscando preguntas acordes a tu nivel!";
    const msjValidationAnswer = "Estamos validando tu respuesta...";
    const msjAprovedAnswer = "Muy bien, Felicitaciones!";

    var userLevel = 1;
    var userScore = 0;
    var idQuestion = 0;
    var processDialog = null;

    // Nombre de usuario en pantalla
    const spanUsername = createViewElement("span", 'name_user');
    bodyDocument.append(spanUsername);

    // boton para eliminar los datos guardados
    const trashButton = createViewElement("img", 'img_trash');
    trashButton.setAttribute("src", "images/trash-svgrepo.svg");
    trashButton.setAttribute("alt", "button to delete user data");
    trashButton.setAttribute("title", "Borrar los datos guardados");
    trashButton.addEventListener("click", () => {
        window.localStorage.clear();
        location.reload();
    });
    bodyDocument.append(trashButton);

    // Contenedor donde se aloja el nivel y los puntajes del usuario
    const divInfoUser = createViewElement('div', 'container_body-info-user');

    //#region Contenedor donde se aloja el nivel del usuario
    const containerInfoUserLevel = createViewElement('div', 'container_body-info-user-data');
    const spanInfoLevel = createViewElement('span', null);
    spanInfoLevel.innerHTML = "Nivel";
    const spanLevelUser = createViewElement('span', 'level_user');
    spanLevelUser.innerHTML = "0";

    containerInfoUserLevel.append(spanInfoLevel, spanLevelUser);
    //#endregion

    //#region Contenedor donde se aloja los puntos del usuario
    const containerScoreUser = createViewElement('div', 'container_body-info-user-data');
    const spanInfoScore = createViewElement('span', null);
    spanInfoScore.innerHTML = "Puntos";

    const spanScoreUser = createViewElement('span', 'score_user');
    spanScoreUser.innerHTML = userScore;
    containerScoreUser.append(spanInfoScore, spanScoreUser);

    divInfoUser.append(containerInfoUserLevel, containerScoreUser);
    //#endregion

    // Contenedor de la pregunta para el usuario
    const containerQuestion = createViewElement('div', 'container_question');
    containerQuestion.innerHTML = txtLoading;

    /**
     * @method getData Obtiene desde el servidor una pregunta aleatoria del nivel en el que se encuentra el usuario.
     * @param {userLevel} userLevel Es verificado para que no se envie en valor 0(cero) ya que el nivel
     * minimo en el que el usuario puede estar es 1
     */
    const getData = async () => {

        if (userLevel == 0) userLevel = 1;
        let data = await controlGame.getDataServer(userLevel);

        containerQuestion.innerHTML = data[0]['question'];
        optionA.innerHTML = data[0]['opt01'];
        optionB.innerHTML = data[0]['opt02'];
        optionC.innerHTML = data[0]['opt03'];
        optionD.innerHTML = data[0]['opt04'];
        spanLevelUser.innerHTML = data[0]['level'];
        idQuestion = data[0]['id'];

        bodyDocument.removeChild(processDialog);
    }

    /** Verifica si el usuario tiene datos guardados y los recupera en el caso que los tenga */
    if (userPersistence.getDataUser('name_user') != 0) {

        spanUsername.innerHTML = userPersistence.getDataUser('name_user');
        userLevel = userPersistence.getDataUser('level');
        userScore = userPersistence.getDataUser('score');

        spanScoreUser.innerHTML = userScore;

        processDialog = mViewsExtras.showDialogProcessors(msjLoadQuestions);
        getData();

    } else {
        mViewsExtras.showDialogaddUser();
        getData();
    }

    /**
     * Este metodo verifica la respuesta seleccionada por el usuario y devuelve solamente 1 de 3 parametros:
     * - 0 = El usuario respondio incorrectamente.
     * - 1 = El usuario respondio correctamente.
     * - 3 = El usuario finalizo el juego.
     * @param {optselection} optselection Opcion seleccionada por el usuario.
     */
    const verifyAnswer = async (optselection) => {
        let response = await controlGame.checkAnswers(optselection, idQuestion);

        if (response['result'] == 1) {

            userLevel = response['level'];
            userScore = parseInt(userScore) + parseInt(response['score']);

            userPersistence.saveData(userLevel, userScore);
            mViewsExtras.showToast(msjAprovedAnswer);
        }

        if (response['result'] == 0) {

            userLevel = 1;
            userScore = 0;

            mViewsExtras.showDialogGameOver();
            userPersistence.cleanData();
        }

        if (response['result'] == 3) {

            userLevel = 1;
            userScore = 0;

            mViewsExtras.showDialogCongratulation();
            userPersistence.cleanData();
        }
        spanScoreUser.innerHTML = userScore;
        getData();
    }

    //#region Contenedor de las respuestas para el usuario
    const optionA = createViewElement('div', 'container_body-response option-a');
    optionA.addEventListener('click', () => {
        processDialog = mViewsExtras.showDialogProcessors(msjValidationAnswer);
        verifyAnswer(1);
    });
    optionA.innerHTML = txtLoading;

    const optionB = createViewElement('div', 'container_body-response option-b');
    optionB.addEventListener('click', () => {
        processDialog = mViewsExtras.showDialogProcessors(msjValidationAnswer);
        verifyAnswer(2);
    });
    optionB.innerHTML = txtLoading;

    const optionC = createViewElement('div', 'container_body-response option-c');
    optionC.addEventListener('click', () => {
        processDialog = mViewsExtras.showDialogProcessors(msjValidationAnswer);
        verifyAnswer(3);
    });
    optionC.innerHTML = txtLoading;

    const optionD = createViewElement('div', 'container_body-response option-d');
    optionD.addEventListener('click', () => {
        processDialog = mViewsExtras.showDialogProcessors(msjValidationAnswer);
        verifyAnswer(4);
    });
    optionD.innerHTML = txtLoading;
    //#endregion

    containerBody.append(divInfoUser, optionA, optionB, optionC, optionD);
    containerPrincipal.append(containerBody, containerQuestion);
}