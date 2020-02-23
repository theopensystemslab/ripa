import { Button } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { ExpandMore } from "@material-ui/icons";
import { useFormik } from "formik";
import * as React from "react";

interface IExpandableCheckboxes {
  title: string;
  name: string;
  panelsOptions: {
    sectionTitle: string;
    values: string[];
  }[];
  callback?;
}

export const ExpandableCheckboxes: React.FC<IExpandableCheckboxes> = ({
  title = "",
  panelsOptions = [
    {
      sectionTitle: "",
      values: []
    }
  ],
  name = "",
  callback = undefined
}) => {
  const formik = useFormik({
    initialValues: {
      [name]: "",
      noOfPanels: panelsOptions.length,
      selectedSections: [],
      selectedOptions: []
    },
    onSubmit: values => {
      // let unDuplicatedSections = Array.from(new Set(values.selectedSections));
      // if (unDuplicatedSections.length !== values.noOfPanels) {
      //   alert("Please select at least one of each section");
      // } else {
      //   alert(JSON.stringify(values, null, 2));
      // }
    }
  });
  return (
    <form onSubmit={callback || formik.handleSubmit}>
      <h1>{title}</h1>
      {panelsOptions.map(({ sectionTitle, values }, index) => (
        <ExpansionPanel key={`${title}-${index}`}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMore />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
          >
            {sectionTitle}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <FormControl component="fieldset">
              <FormLabel component="legend" />
              <FormGroup>
                {values.map((checkbox, index) => (
                  <div key={`${checkbox}-${index}`}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formik.values.selectedOptions.includes(
                            checkbox
                          )}
                          onChange={e => {
                            if (e.target.checked) {
                              formik.setFieldValue("selectedOptions", [
                                ...formik.values.selectedOptions,
                                checkbox
                              ]);
                              formik.setFieldValue("selectedSections", [
                                ...formik.values.selectedSections,
                                sectionTitle
                              ]);
                            } else {
                              formik.setFieldValue(
                                "selectedOptions",
                                formik.values.selectedOptions.filter(
                                  el => el !== checkbox
                                )
                              );
                              formik.setFieldValue(
                                "selectedSections",
                                formik.values.selectedSections.filter(
                                  el => el !== sectionTitle
                                )
                              );
                            }
                          }}
                          value={checkbox}
                          name={checkbox}
                        />
                      }
                      label={checkbox}
                    />
                  </div>
                ))}
              </FormGroup>
            </FormControl>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ margin: "10px 0" }}
      >
        Save and Continue
      </Button>
    </form>
  );
};

export default {
  default: (
    <ExpandableCheckboxes
      title="Expandable Checkboxes"
      name="ExpandableCheckboxes"
      panelsOptions={[
        {
          sectionTitle: "section A",
          values: ["Response A1", "Response A2", "Response A3"]
        },
        {
          sectionTitle: "section B",
          values: ["Response B1", "Response B2", "Response B3"]
        },
        {
          sectionTitle: "section C",
          values: ["Response C1", "Response C2", "Response C3"]
        }
      ]}
    />
  )
};
