class App extends Algorithms {
    constructor(level) {
        super(level);
        this._level = level;
        
        if (!this.validLevel()) return;
        
        this.rootElement = document.getElementById('root');
        this.rootTmpl = this.rootElement.innerHTML;
        
        this.data = this.generateData();
        this.render();
        this.hideLoading();
        
        this._game = new Game();
    }
    
    render() {
        let {data, rootTmpl} = this;
        this.rootElement.innerHTML = Handlebars.compile(rootTmpl)({rows: data});
    }
    
    generateData() {
        let data = [],
            images = [],
            columns = [];
        
        for (let i = 1; i <= this.getImgCount(); i++) images.push(i);
        
        let imgShuffled = Helpers.shuffle([...images, ...images]);
        
        imgShuffled.forEach(value => {
            columns.push(value);
            if (columns.length === this.getColumnsForOneRow()) {
                data.push(columns);
                columns = [];
            }
        });
        
        return data;
    }
    
    validLevel() {
        let {_level} = this;
        return _level && !isNaN(_level) && _level > 0 && _level <= this.MAX_LEVEL;
    }
    
    hideLoading() {
        setTimeout(() => {

            this.rootElement.classList.remove('d-none');
            this.rootElement.classList.add('fade-in');
        }, 5000);
    }
}