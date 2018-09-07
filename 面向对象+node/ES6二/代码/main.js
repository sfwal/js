import {name,age,Parent} from 'parent.js'


class Child extends Parent{
    constructor(obj){
        super();
        this._config = obj
    }
    hw(){
        console.log("hello world!");
    }
    set val(value){
        this._config.name = value
        console.log(`name:${value}`)
    }
    get val(){
        console.log(this._config.name);
    }
    var child = new Child({name,age});
    child.hw();
}