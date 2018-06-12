import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MaterialIcon from 'material-icons-react';
import { connect } from 'react-redux';
import { Panel, Button, Modal, FormGroup, ControlLabel, FormControl, Form } from 'react-bootstrap';
import List from '../components/collections/List';
import {
    errorNotification,
    getSources,
    getData,
    deleteFeed,
    addFeed,
} from '../actions/index';


class Dashboard extends Component {
    constructor(props) {
        super();
        this.state = {
            addNew: false,
            item: null,
            source: null,
            sourceTitle: '',
            newFeed: {
                value: '',
                url: '',
            },
        };
    }

    componentWillMount() {
        this.props.getSources && this.props.getSources();
    }

    componentWillReceiveProps(nextProps) {
        const nextTitle = nextProps.data.data.title;

        if (nextTitle !== this.sourceTitle) {
            this.setState({ sourceTitle: nextTitle });
        }
    }

    onSelectSource = (source) => {
        this.props.getData({ source });

        source && this.setState({ source });
    };

    onRemove = (evt, title) => {
        evt.stopPropagation();
        this.props.deleteFeed({ title });
    };

    saveNew = (evt) => {
        const formEl = ReactDOM.findDOMNode(this.formRef);
        if (!formEl.reportValidity()) {
            this.props.errorNotification('Form is invalid');
            return;
        }

        const feed = {
            ...this.state.newFeed,
            key: this.state.newFeed.value.substr(0, 5).toUpperCase(),
        };
        this.props.addFeed(feed);
        this.setState({ addNew: false });
    };

    renderSourceList = () => {
        const ddId = `dropdown-${(new Date()).getTime()}`;
        const { sources } = this.props.data;

        const ItemRenderer = (props) => {
            const data = props.data;
            return (
                <div className="item font-section padding-b-tb"
                     data-ref={data.url}
                     key={data.url}>
                    <Button bsStyle="link"
                            className="padding-b-lr"
                            data-ref={data.url}
                            bsSize="lg"
                            onClick={(evt) => { this.onRemove(evt, data.value);}}>
                        <MaterialIcon icon="remove" />
                    </Button>
                    <Button bsStyle="link"
                            className="padding-b-lr"
                            data-ref={data.url}
                            bsSize="lg"
                            onClick={this.showFeeds}>
                        <MaterialIcon icon="format_align_justify" />
                    </Button>
                    <div className="title padding-b-lr">
                        { data.value }
                    </div>
                </div>
            );
        };

        return (
            <Panel>
                <Panel.Heading>
                    <div className="item">
                        <div className="font-title name trunkate">
                             <Button bsStyle="link" className="padding-b-lr" style={{display: 'inline'}}
                                    bsSize="lg"
                                    onClick={() => { this.setState({ addNew: true }); }}>
                                 <MaterialIcon icon="add" />
                            </Button>
                            Feeds
                        </div>
                    </div>
                </Panel.Heading>
                <Panel.Body className="ts-panel-body">
                    <List itemRender={ItemRenderer}
                          items={sources.map(e => { e.id = e.key; return e; }) }
                          onSelect={this.onSelectSource}
                    />
                </Panel.Body>
            </Panel>
        );
    };

    onItemSelect = (id) => {
        const match = this.props.data.data.items.find(e => (e.id === id || e.guid === id));
        this.setState({ item: match });
    };

    onExternal = (evt) => {
        const id =  evt.currentTarget.getAttribute('data-ref');

        const item = this.state.item
            ? this.state.item
            : this.props.data.data.items.find(e => (e.id === id || e.guid === id));

        const url = item.link || item.guid;
        const win = window.open(url, '_blank');
        win.focus();
    };

    closeModal = () =>{ this.setState({ source: null }); };

    onNameChange = (evt) => {
        const newFeed = {
            ...this.state.newFeed,
            value: evt.currentTarget.value,
        };
        this.setState({ newFeed });
    };


    onUrlChange = (evt) => {
        const newFeed = {
            ...this.state.newFeed,
            url: evt.currentTarget.value,
        };
        this.setState({ newFeed });
    };

    renderDataForSource() {
        const {
            data,
        } = this.props.data;

        const title = this.state.source ?
            `${ this.state.sourceTitle }`
            : '';

        const ItemRenderer = (props) => {
            const entry = props.data;
            return (
                <div className="item font-section padding-b-tb" data-ref={entry.id} key={entry.id}>
                    <Button bsStyle="link" className="padding-b-lr" data-ref={entry.id}
                            bsSize="lg"
                            onClick={this.onExternal}>
                        <MaterialIcon icon="open_in_new" />
                    </Button>
                    <div className="padding-b-lr">
                        { entry.title }
                        <div className="font-section-greyed">
                            { entry.pubDate }
                        </div>
                    </div>
                </div>
            );
        };

        return (
            <div>
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title className="font-title"> {title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <List itemRender={ItemRenderer}
                              items={data.items}
                              onSelect={this.onItemSelect}
                        />
                    </Modal.Body>

                   <Modal.Footer>
                        <Button onClick={this.closeModal}>Cancel</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }

    showAddModal = () => {
        return (
            <div key="add-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title className="font-title"> Add new feed </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form ref={(c) => { this.formRef = c;}}>
                            <FormGroup key={'field-1'}
                                controlId="value"
                            >
                                <ControlLabel>Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    onChange={ this.onNameChange }
                                />
                                <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup key="field-2"
                                controlId="url"
                            >
                                <ControlLabel>Url</ControlLabel>
                                <FormControl
                                    type="text"
                                    onChange={ this.onUrlChange }
                                />
                                <FormControl.Feedback />
                            </FormGroup>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={ () => this.setState({ addNew: false }) }>Cancel</Button>
                        <Button bsStyle="primary" onClick={this.saveNew}>Save</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    };

    render() {
        const showModal = !!this.state.source;
        const addNew = !!this.state.addNew;

        return (
            <div className="content">
                <div className="wrapper">
                    { this.renderSourceList() }
                    { showModal && this.renderDataForSource() }
                    { addNew && this.showAddModal()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        auth: state.auth.toJS(),
        data: state.data.toJS(),
    });
};

const mapDispatchToProps = (dispatch) => {
    return ({
        errorNotification: (message) => dispatch(errorNotification(message)),
        getData: (filter) => dispatch(getData(filter)),
        getSources: () => dispatch(getSources()),
        deleteFeed: (filter) => dispatch(deleteFeed(filter)),
        addFeed: (feed) => dispatch(addFeed(feed)),

    });
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
