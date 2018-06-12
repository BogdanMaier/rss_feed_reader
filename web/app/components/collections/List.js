import React, { Component, PropTypes } from 'react';
import { BounceLoader } from 'react-spinners';
import '../../styles/list.scss';

class List extends Component {
    constructor(props) {
        super();
        this.state = {
            items: [],
            selectedItem: null,
            isLoading: !!props.isLoading,
            spinner: props.spinner,
        };
    }

    componentDidMount() {
        const {
            getData
        } = this.props;
        getData && getData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== undefined && nextProps.isLoading !== this.state.isLoading) {
            this.setState({ isLoading: nextProps.isLoading });
        }
    }

    getClsByType = () => {
        return ['vertical', 'horizontal'].indexOf(this.props.type) !== -1
            ? this.props.type
            : 'vertical';
    };

    itemClick = (evt) => {
        const dataRef = evt.currentTarget.getAttribute('data-ref');

        this.props.onSelect && this.props.onSelect(dataRef);

        if (dataRef === this.state.selectedItem) {
            this.setState({ selectedItem: null });
            return;
        }

        this.setState({ selectedItem: dataRef });
    };

    renderItems = () => {
        const items = this.props.items;

        if (!items || !items.length) {
            return <span className="empty-lbl">No data</span>;
        }

        return (
            items.map((item, i) => {
                const theId = item.id || item.guid;
                const dataRef = `${theId || 'l-i-' + i}`;
                return  (
                    <div className={this.state.selectedItem === dataRef ? 'selected' : ''}
                         onClick={!this.props.unselectable && this.itemClick}
                         data-ref={dataRef}
                         key={dataRef}
                    >
                        {this.props.itemRender({ data: item, key: dataRef, optsData: this.props })}
                    </div>
                );
            })
        );
    };

    render() {
        const listCls = `list ${ this.getClsByType()}`;
        return (
            <div className={listCls} >
                {
                    this.props.spinner && this.state.isLoading &&
                    <div className="spinner-container">
                        <BounceLoader
                            color={'#84cdfc'}
                            loading={this.state.isLoading}
                        />
                    </div>
                }
                { this.renderItems() }
            </div>
        );
    }
}

List.propTypes = {
    name: PropTypes.string,
    items: PropTypes.array,
    selectedItem: PropTypes.object,
    isLoading: PropTypes.bool,
    spinner: PropTypes.bool,
};

export default List;
