var GridItem = React.createClass({
  handleClick:function(){
      if(!this.props.data.is_container) return;
      this.props.handleClick($('#resource-view-reactable').data('fetch') + this.props.data.id);
  },
  render: function() {
    var icon;
    if(this.props.data.is_container) {
        icon = (this.props.data.conatiner_open) ? 'folder-open' : 'folder';
    } else {
        switch(this.props.data.class_key) {
          case 'modWebLink':
              icon = 'link';
          break;

          default:
              icon = (this.props.data.linkattributes) ? ((this.props.data.linkattributes)) : 'file-text-o'
          break;
        }
    }

    //var titleAttr = "ID: " + this.props.data.id + "; " + "Published";
    var cur = (this.props.data.id == MODx.resource.id) ? true : false;
    var link = (cur) ? <a href={this.props.data.href}><strong>{decodeHTML(this.props.data.title)}</strong></a> : <a href={this.props.data.href}>{decodeHTML(this.props.data.title)}</a>;
    var publishedOn = (this.props.data.publishedon) ? new Date(this.props.data.publishedon).toLocaleDateString() : ' ';
    var xlinkHref = ((inlineSVGIcons) ? '' : 'assets/img/icons.svg') + '#icon-' + icon;
    return (
        <tr>
            <td>
              <svg onClick={this.handleClick} className="icon"><use xlinkHref={xlinkHref}></use></svg>&nbsp;
              {link}
            </td>
            <td>{decodeHTML(this.props.data.introtext)}</td>
            <td>{publishedOn}</td>
        </tr>
      );
  }
});

var Grid = React.createClass({
    getInitialState: function() {
        return {
            items: [],
            path:[''],
            resource:{
                id:"",
                alias:""
            }
        };
    },
    handleMount: function() {
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          success: function(data) {
            this.setState(data);
            //if(this.props.stateSetCallback) this.props["stateSetCallback"]();
            //window.dispatchEvent(new Event('resource_view__stateSet')); //IE 11 dies here
          }.bind(this),
          error: function(xhr, status, err) {
              //console.log('error');
          }.bind(this)
        });

        /*
        var previewClicked = function(e){
            e.preventDefault();
            $('body').toggleClass('inverted');
        };
        */
        //$('a.preview').unbind('click',previewClicked).bind('click',previewClicked);
    },
    componentDidMount: function() {
        this.handleMount();
    },
    handleClick:function(fetch){
        this.props.url = fetch;
        this.handleMount();
    },
    handleSlugClick:function(fetch){
        this.handleClick(fetch);
    },
    render: function() {
        var that = this;
        var context = 'web';
        return (
            <div>
              <h4>
                <a href="http://markup.tips"><code>markup.tips</code></a>
                <div className="codepath">
                    <pre title="Imagine this is interactive, terminal like with tab-to-complete">{this.state.path.map(function(item, i){
                        return (
                            <span>
                              <a data-fetch={item.fetch} className="clickable" onClick={that.handleSlugClick.bind(this, item.fetch)}>{item.slug}</a>
                              <span>/</span>
                            </span>
                        );
                    })}</pre>
                </div>
              </h4>
              <table border="0" cellspacing="0" cellpadding="0">
              <thead>
                  <tr>
                    <th>Page</th>
                    <th>Description</th>
                    <th>Published On</th>
                  </tr>
              </thead>
              <tbody id="resource-view-body">
                {this.state.items.map(function (item, i) {
                    return (
                        <GridItem handleClick={that.handleClick} data={item} key={context + item.id} ref={'item'+i} ></GridItem>
                    );
                })}
              </tbody>
              </table>
            </div>
        );
    }
});

var b = '0';
try { b = MODx.tree.branch; } catch (e) {}
var j = $('#resource-view-reactable').data('fetch') + b;
React.render(<Grid url={j} />, document.getElementById('resource-view-reactable'));

var TodoList = React.createClass({
  itemClicked: function(i) {
      //console.log(event);
      this.props.handleItemClicked(i);
  },
  render: function() {
  var that = this;
    var createItem = function(item,i) {
        var icon = ((inlineSVGIcons) ? '' : 'assets/img/icons.svg') + ((item.done) ? '#icon-check-circle-o' : '#icon-circle-o');
        return <li onClick={that.itemClicked.bind(that,i)}><p><svg className="icon"><use xlinkHref={icon}></use></svg>&nbsp;{item.text}</p></li>;
    };
    return <ul className="naked">{this.props.items.map(createItem)}</ul>;
  }
});
var TodoApp = React.createClass({
  getInitialState: function() {
    return {text:'', items: [ // pretend this comes from server
        {id:0,text:<span>Follow <a href="http://twitter.com/mrktps" target="_blank" onClick={function(event){event.stopPropagation();}}>@mrktps</a></span>,done:false},
        {id:2,text:<span>Learn how this Component <a href="components/accessible-todo.php" onClick={function(event){event.stopPropagation();}}>was built</a></span>,done:false}
    ]};
  },
  addItem: function(e) {
      this.setState({items: this.state.items.concat({text:this.state.text,done:false}), text:''});
      this.refs.TaskTitle.getDOMNode().focus();
      return false;
  },
  handleItemClicked: function(i) {
      this.state.items[i].done = !this.state.items[i].done;
      this.setState({items: this.state.items});
  },
  onChange: function(e) {
      this.setState({text: e.target.value});
  },
  render: function() {
      var _disabled = this.state.text == '' ? true : false;
      var xLinkHref = ((inlineSVGIcons) ? '' : 'assets/img/icons.svg') + '#icon-circle-o';
    return (
        <form className="box" onSubmit={this.addItem}>
            <h2 id="task-list"><svg className="icon"><use xlinkHref="{xLinkHref}"></use></svg><br />Task List</h2>
            <TodoList items={this.state.items} handleItemClicked={this.handleItemClicked} />
            <footer className="add-item">
                <input required ref="TaskTitle" type="text" name="text" onChange={this.onChange} value={this.state.text} placeholder="Add a new item&hellip;" />
                <button disabled={_disabled} type="submit">
                    <svg className="icon"><use xlinkHref="#icon-plus"></use></svg>
                </button>
            </footer>
        </form>
    );
  }
});

React.render(<TodoApp />, document.getElementById('task-list'));
