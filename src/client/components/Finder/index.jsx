import React from 'react';
import Autosuggest from 'react-autosuggest';
import classNames from 'classnames';
import styles from './styles';
import {Label, Text} from 'components';
import { Paper, TextField, MenuItem } from 'material-ui';

import {withStyles} from 'material-ui/styles';
import {Link} from "react-router-dom";

function renderInput(inputProps) {
    const { classes, autoFocus, value, ref, ...other } = inputProps;

    return (
        <TextField
            autoFocus={autoFocus}
            fullWidth
            value={value}
            inputRef={ref}
            InputProps={{
                classes: {
                    input: classes.input,
                },
                ...other,
            }}
        />
    );
}

function renderSuggestionsContainer(options) {
    const { containerProps, children } = options;

    return (
        <Paper {...containerProps} square>
            {children}
        </Paper>
    );
}

function getSuggestionValue(suggestion) {
    return suggestion.name;
}

function renderSuggestion (classes, data, item) {
    return (
        <MenuItem component="div" className="p-3" classes={{root: classes.suggestionMenuItem}}>
            <Link to={data.getLink(item)} className={classes.suggestionItemLink}>
                <Paper>
                    <img src={data.getLogo(item)} className={classes.suggestionImage}/>
                </Paper>

                <div className="ml-2">
                    <Label uppercase bold fontSize="1.5rem">{data.getTitle(item)}</Label>
                    <Text className="mt-1" maxLines={2}>{data.getDescription(item)}</Text>
                </div>
            </Link>
        </MenuItem>
    );
}

@withStyles(styles)
export default class Finder extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { t, classes, values, placeholder, handleSuggestionsFetchRequested, onSuggestionsClearRequested,
            onChange, value, suggestionData} = this.props;
        return (
            <Autosuggest
                theme={{
                    container: classNames(classes.container, 'p-3'),
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                }}
                renderInputComponent={renderInput}
                suggestions={values}
                onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                renderSuggestionsContainer={renderSuggestionsContainer}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion.bind(null, classes, suggestionData)}
                inputProps={{
                    autoFocus: false,
                    classes,
                    placeholder,
                    value,
                    onChange,
                }}
            />
        )
    }
}
