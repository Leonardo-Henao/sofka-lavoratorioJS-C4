export class GameControl {

    #URLSERVER = 'https://sfk.iptvlistasm3u.com/';

    /**
     * @method getDataServer Obtiene desde el servidor una preguna aleatoria correspondiente al nivel en el que este el usuario
     * @param {level} level - Nivel de usuario del cual obtendra una pregunta aleatoria
     */
    getDataServer(level) {

        let formData = new FormData();
        formData.append('lvl', level);

        const dataServer = async () => {
           
            return fetch(`${this.#URLSERVER}get_data.php`, { method: "POST", body: formData })
                .then(Response => { return Response.json(); })
                .then(Response => Response)
        }

        const parseData = () => {
            return new Promise(async (resolve, reject) => {
                let data = await dataServer();
                resolve(data);
            })
        }

        return parseData();
    }

    /**
     * @method checkAnswers Verifica si la opcion de la pregunta seleccionada es la correcta.
     * @param {userAnswer} userAnswer Valor de la respuesta del usuario
     * @param {idQuestion} idQuestion ID de la pregunta contestada por el usuario
     */
    checkAnswers = (userAnswer, idQuestion) => {

        let formData = new FormData();
        formData.append('resp', userAnswer);
        formData.append('id_q', idQuestion);

        const checkData = async () => {
            return fetch(`${this.#URLSERVER}check_qst.php`, { method: 'POST', body: formData })
                .then((response) => { return response.json() })
                .then((responseData) => responseData);
        }

        const parseData = () => {
            return new Promise(async (resolve, reject) => {
                let data = await checkData();
                resolve(data);
            });
        }
        return parseData();
    }
}