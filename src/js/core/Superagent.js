import superagent from 'superagent';;
class Superagent extends superagent{
    constructor(props){
        super(props)
    }
    get(url, param, fn){
        this.get(url, param).then((data) => {
            fn(55)
        })
    }
}

export default Superagent;