import { createViewElement } from "./methos.create.view.js";

export const mView = () => {

    const containerPrincipal = document.getElementById("container");
    const containerBody = createViewElement('div', 'container_body');

    // Contenedor donde se alojara el nivel y los puntajes del usuario
    const divInfoUser = createViewElement('div', 'container_body-info-user');

    // Contenedor donde se alojara el nivel del usuario
    const containerInfoUserLevel = createViewElement('div', 'container_body-info-user-level');
    const spanInfoLevel = createViewElement('span', null);
    spanInfoLevel.innerHTML = "Nivel";
    const spanLevelUser = createViewElement('span', 'level_user');
    spanLevelUser.innerHTML = "4";

    containerInfoUserLevel.append(spanInfoLevel, spanLevelUser);

    // Contenedor donde se alojaran los puntos del usuario
    const containerScoreUser = createViewElement('div', null);
    containerScoreUser.innerHTML = 'Puntos: ';

    const spanScoreUser = createViewElement('span', 'score_user');
    spanScoreUser.innerHTML = 5;
    containerScoreUser.appendChild(spanScoreUser);

    divInfoUser.append(containerInfoUserLevel, containerScoreUser);

    // Contenedor de las respuestas para el usuario
    const optionA = createViewElement('div', 'container_body-response option-a');
    optionA.innerHTML = '1000';
    const optionB = createViewElement('div', 'container_body-response option-b');
    optionB.innerHTML = '1200';
    const optionC = createViewElement('div', 'container_body-response option-c');
    optionC.innerHTML = '2000';
    const optionD = createViewElement('div', 'container_body-response option-d');
    optionD.innerHTML = '10000';

    // Contenedor de la pregunta para el usuario
    const containerQuestion = createViewElement('div', 'container_question');
    containerQuestion.innerHTML = '¿Cuanto es 1 + 1999?';

    containerBody.append(divInfoUser, optionA, optionB, optionC, optionD, containerQuestion);
    containerPrincipal.append(containerBody);
}