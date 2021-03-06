import { Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";
import { ExpandMore } from "@material-ui/icons";
import { useFormik } from "formik";
import React, { useState } from "react";
import { FocusWithin } from "react-focus-within";

import Messages from "../shared/components/submit-messages";
import Checkbox from "./Checkbox";
import FocusHandler from "./FocusHandler";
import Question from "./Question";

const useStyles = makeStyles(theme => ({
  formControlLabelRoot: {
    marginLeft: 0,
    marginBottom: theme.spacing(1.5)
  },
  formControlLabel: {
    fontWeight: 400
  },
  expansionPanel: {
    background: "none"
  },
  expandedPanel: {
    backgroundColor: theme.palette.grey[100]
  },
  summary: {
    padding: theme.spacing(1, 2)
  },
  summaryContent: {
    margin: "0 !important"
  },
  details: {
    padding: theme.spacing(0, 2, 1)
  }
}));

interface IExpandableCheckboxes {
  title: string;
  name: string;
  panelsOptions: {
    sectionTitle: string;
    values: string[];
  }[];
  callback?;
  required?: boolean;
  includeSubmit?: boolean;
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
  callback = undefined,
  required = false,
  includeSubmit = false
}) => {
  const [successMessageVisible, setSuccessMessageVisible] = React.useState(
    false
  );
  const [submitButtonDisabled, setSubmitButtonDisabled] = React.useState(
    required
  );

  const formik = useFormik({
    initialValues: {
      [name]: "",
      noOfPanels: panelsOptions.length,
      selectedSections: [],
      selectedOptions: []
    },
    validate: values => {
      if (!required) return;

      const unDuplicatedSections = Array.from(new Set(values.selectedSections));
      if (unDuplicatedSections.length !== values.noOfPanels) {
        setSubmitButtonDisabled(true);
      } else {
        setSubmitButtonDisabled(false);
      }
    },
    onSubmit: (values, { resetForm }) => {
      setSuccessMessageVisible(true);
      setTimeout(() => {
        resetForm();
        setSuccessMessageVisible(false);
        setSubmitButtonDisabled(false);
      }, 1000);
    }
  });
  const classes = useStyles();
  return (
    <FocusWithin>
      {({ isFocused, getFocusProps }) => (
        <FocusHandler {...getFocusProps()}>
          <form
            data-testid="expandableForm"
            onSubmit={callback || formik.handleSubmit}
          >
            <Box py={3} maxWidth={500}>
              <Box pb={1}>
                <Question inFocus={isFocused}>{title}</Question>
              </Box>
              {panelsOptions.map(({ sectionTitle, values }, index) => (
                <ExpansionPanel
                  key={`${title}-${index}`}
                  classes={{
                    root: classes.expansionPanel,
                    expanded: classes.expandedPanel
                  }}
                >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMore />}
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                    id="additional-actions1-header"
                    classes={{
                      root: classes.summary,
                      content: classes.summaryContent
                    }}
                  >
                    {sectionTitle}
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.details}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend" />
                      <FormGroup>
                        {values.map((checkbox, index) => (
                          <div key={`${checkbox}-${index}`}>
                            <FormControlLabel
                              classes={{
                                root: classes.formControlLabelRoot,
                                label: classes.formControlLabel
                              }}
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
              {includeSubmit && (
                <Box pt={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={submitButtonDisabled}
                    style={{ margin: "10px 0" }}
                  >
                    Save and Continue
                  </Button>
                </Box>
              )}
              <div>
                {successMessageVisible ? (
                  <Messages
                    type="success"
                    message="Form submitted successfully"
                  />
                ) : null}
              </div>
            </Box>
          </form>
        </FocusHandler>
      )}
    </FocusWithin>
  );
};

export default ExpandableCheckboxes;
