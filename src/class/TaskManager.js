
export class TaskManager {
    constructor() {
        this.promises = []
    }

    stop(){
        this.promises = []
    }

    addTask(nextpromise) {
        var onStart = null;
        var started = false;
        let promise = new Promise((success, error)=>{
            let next = this.promises[this.promises.length - 1]
            let resnext = ()=>{
                nextpromise()
                .then(success)
                .catch(error)
                .finally(()=>{
                    this.promises.shift()
                })
                if (onStart)
                    onStart()
                started = true
            }
            if(next){
                next.finally(resnext)
            }else{
                resnext()
            }
        })
        this.promises.push(promise)
        promise.started = (fn)=>{
            if (started) {
                fn()
            } else {
                onStart = fn;
            }
            return promise;
        }
        return promise
    }
}
