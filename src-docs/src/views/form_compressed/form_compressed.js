import React, { Component } from 'react';

import {
  EuiCheckboxGroup,
  EuiComboBox,
  EuiFieldText,
  EuiFormRow,
  EuiFilePicker,
  EuiRange,
  EuiSelect,
  EuiSwitch,
  EuiPanel,
  EuiSpacer,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default class extends Component {
  constructor(props) {
    super(props);

    const idPrefix = htmlIdGenerator()();

    this.state = {
      isSwitchChecked: false,
      checkboxes: [
        {
          id: `${idPrefix}0`,
          label: 'Option one',
        },
        {
          id: `${idPrefix}1`,
          label: 'Option two is checked by default',
        },
        {
          id: `${idPrefix}2`,
          label: 'Option three',
        },
      ],
      checkboxIdToSelectedMap: {
        [`${idPrefix}1`]: true,
      },
      comboBoxSelectionOptions: [],
      value: '20',
    };
  }

  onRangeChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  onSwitchChange = () => {
    this.setState({
      isSwitchChecked: !this.state.isSwitchChecked,
    });
  };

  onCheckboxChange = optionId => {
    const newCheckboxIdToSelectedMap = {
      ...this.state.checkboxIdToSelectedMap,
      ...{
        [optionId]: !this.state.checkboxIdToSelectedMap[optionId],
      },
    };

    this.setState({
      checkboxIdToSelectedMap: newCheckboxIdToSelectedMap,
    });
  };

  render() {
    return (
      <EuiPanel style={{ maxWidth: 300 }}>
        <EuiFormRow
          label="Text field"
          helpText="I am some friendly help text."
          display="rowCompressed">
          <EuiFieldText name="first" isLoading compressed />
        </EuiFormRow>

        <EuiFormRow label="Select" display="rowCompressed">
          <EuiSelect
            options={[
              { value: 'option_one', text: 'Option one' },
              { value: 'option_two', text: 'Option two' },
              { value: 'option_three', text: 'Option three' },
            ]}
            compressed
          />
        </EuiFormRow>

        <EuiFormRow label="File picker" display="rowCompressed">
          <EuiFilePicker compressed display="default" />
        </EuiFormRow>

        <EuiFormRow label="Combobox" display="rowCompressed">
          <EuiComboBox
            options={[
              { label: 'Option one' },
              { label: 'Option two' },
              { label: 'Option three' },
            ]}
            compressed
            selectedOptions={this.state.comboBoxSelectionOptions}
            onChange={comboBoxSelectionOptions =>
              this.setState({ comboBoxSelectionOptions })
            }
          />
        </EuiFormRow>

        <EuiFormRow label="Range" display="rowCompressed">
          <EuiRange
            min={0}
            max={100}
            name="range"
            id="range"
            showInput
            compressed
            value={this.state.value}
            onChange={this.onRangeChange}
          />
        </EuiFormRow>

        <EuiFormRow
          label="Switch"
          display="rowCompressed"
          hasChildLabel={false}>
          <EuiSwitch
            label="Should we do this?"
            name="switch"
            checked={this.state.isSwitchChecked}
            onChange={this.onSwitchChange}
            compressed
          />
        </EuiFormRow>

        <EuiSpacer size="m" />

        <EuiCheckboxGroup
          options={this.state.checkboxes}
          idToSelectedMap={this.state.checkboxIdToSelectedMap}
          onChange={this.onCheckboxChange}
          legend={{
            children: 'Checkboxes',
          }}
          compressed
        />
      </EuiPanel>
    );
  }
}
