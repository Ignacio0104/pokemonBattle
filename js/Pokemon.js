class Pokemon {

    constructor(id,name,power,image)
    {
        this._name=name;
        this._id=id;
        this._power=power
        this._image=image;
    }

    get name()
    {
        return this._name;
    }

    get id()
    {
        return this._id;
    }

    get power()
    {
        return this._power;
    }

    get image()
    {
        return this._image;
    }
}