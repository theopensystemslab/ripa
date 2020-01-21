import { firebaseId as guid } from "@bentobots/utils";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";
import difference from "lodash/difference";
import React from "react";
import {
  AlignLeft as MenuIcon,
  Edit3 as NotesIcon,
  Info as InfoIcon,
  MessageSquare as MessageIcon,
  X as CloseIcon
} from "react-feather";
import { Link } from "react-navi";
import { api, TYPES, useStore } from "../../lib/store";
import useForm from "../../lib/useForm";
import FormSection from "./components/FormSection";
import InputField from "./components/InputField";
import SelectField from "./components/SelectField";
import flags from "./flags";
import { useStyles } from "./form";
// import removeFor from "../../../lib/removeFor";

type IEditStatement = {
  data;
  handleClose?;
  handleDelete?;
  showOriginal?: boolean;
  responseId?: string;
};

type INewStatement = {
  beforeId?: string;
  handleClose?;
  responseId?: string;
};

type IStatementForm = {
  beforeId?: string;
  data?;
  handleClose;
  handleDelete?;
  submitText: string;
  responseId?: string;
};

export const filterValues: any = data =>
  Object.entries(data).reduce((acc, [k, v]) => {
    if ((k === "$t" || !k.startsWith("$")) && v !== "") acc[k] = v;
    return acc;
  }, {});

const StatementForm: React.FC<IStatementForm> = ({
  beforeId,
  data = {},
  handleClose,
  handleDelete,
  responseId = null,
  submitText
}) => {
  const set = useStore(state => state.sset);

  const classes = useStyles();

  const defaults = {
    definition: "",
    extraInfo: "",
    fn: "",
    internalNotes: "",
    policyRef: "",
    responses: [{ id: guid(), text: "", val: "" }],
    text: ""
  };

  const { values, handleChange, handleSubmit, setFieldValue } = useForm(
    { ...defaults, ...data },
    v => {
      const { responses = [], ...statementValues } = filterValues(v);

      statementValues.$t = TYPES.Statement;

      const { id = guid(), ...statement } = statementValues;
      const {
        flow,
        addNode,
        removeNode,
        setNode,
        connectNodes
      } = api.getState();

      if (flow.nodes[id]) {
        // update statement

        const existingResponseIds = flow.edges
          .filter(([src]) => src === id)
          .map(([, tgt]) => tgt);

        const diff = difference(
          existingResponseIds,
          responses.map(r => r.id)
        );

        diff.forEach(i => removeNode(i, id));

        responses.forEach(({ id: rId, ...response }) => {
          if (response.text) {
            setNode(rId, filterValues(response));
            // flow.nodes[rId] = filterValues(response);
            if (!existingResponseIds.includes(rId)) {
              // flow.edges.push([id || null, rId]);
              connectNodes(id, rId);
            }
          }
        });
      } else {
        // create statement

        const $children = responses.reduce((acc, { id: rId, ...response }) => {
          if (response.text) {
            acc[rId] = {
              ...filterValues(response),
              $t: TYPES.Response
            };
          }
          return acc;
        }, {});
        console.log({ $children });

        addNode(
          { id, $children, ...statement },
          responseId || null,
          beforeId || null
        );
      }

      handleClose();

      // set(state => {
      //   const { id = guid(), ...statement } = statementValues;

      //   if (!state.flow.nodes[id]) {
      //     // (new statement)

      //     const edge = [responseId || null, id];

      //     if (beforeId) {
      //       const i = state.flow.edges.findIndex(
      //         // src === responseId &&
      //         ([, tgt]) => tgt === beforeId
      //       );
      //       state.flow.edges.splice(i, 0, edge);
      //     } else {
      //       state.flow.edges.push(edge);
      //     }

      //     responses.forEach(({ id: rId, ...response }) => {
      //       if (response.text) {
      //         state.flow.nodes[rId] = filterValues(response);
      //         state.flow.edges.push([id || null, rId]);
      //       }
      //     });
      //   } else {
      //     // (existing statement)

      //     const existingResponseIds = state.flow.edges
      //       .filter(([src]) => src === id)
      //       .map(([, tgt]) => tgt);

      //     const diff = difference(
      //       existingResponseIds,
      //       responses.map(r => r.id)
      //     );

      //     console.log("REMOVE STUFF HERE");
      //     // diff.forEach(i => removeFor(i, state.flow));

      //     responses.forEach(({ id: rId, ...response }) => {
      //       if (response.text) {
      //         state.flow.nodes[rId] = filterValues(response);
      //         if (!existingResponseIds.includes(rId)) {
      //           state.flow.edges.push([id || null, rId]);
      //         }
      //       }
      //     });
      //   }

      //   state.flow.nodes[id] = statement;
      // }, handleClose);
    }
  );

  return (
    <Modal open onClose={handleClose}>
      <form className={classes.paper} onSubmit={handleSubmit}>
        {!handleDelete && (
          <Box
            className={classes.modalHeader}
            p={2}
            fontSize="subtitle1.fontSize"
            fontWeight="700"
          >
            <Grid container justify="flex-start" spacing={3}>
              <Grid item>
                <Link
                  href={window.location.pathname.replace(
                    "/portals/",
                    "/statements/"
                  )}
                >
                  Add Statement
                </Link>
              </Grid>
              <Grid item>
                {/* <Box color="text.primary">{() => <span>Add Flow</span>}</Box> */}
                <Link
                  href={window.location.pathname.replace(
                    "/statements/",
                    "/portals/"
                  )}
                >
                  Add Portal
                </Link>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* form */}

        <Box px={4} pt={4} className={classes.formContainer}>
          <FormSection label={false} icon={<MenuIcon size={20} />}>
            <InputField
              autoFocus={true}
              multiline
              name="text"
              onChange={handleChange}
              placeholder="Statement text"
              required={true}
              rows={2}
              value={values.text || ""}
            />
            <InputField
              multiline
              name="fn"
              onChange={handleChange}
              placeholder="fn"
              rows={2}
              value={values.fn || ""}
            />
          </FormSection>

          <Responses
            handleChange={handleChange}
            responses={values.responses || []}
            setFieldValue={setFieldValue}
            showVals={!!values.fn}
          />

          <FormSection label="Extra information" icon={<InfoIcon size={20} />}>
            <InputField
              multiline
              name="extraInfo"
              onChange={handleChange}
              placeholder="Extra Info"
              rows={2}
              value={values.extraInfo || ""}
            />

            <InputField
              name="policyRef"
              onChange={handleChange}
              placeholder="Policy ref"
              type="text"
              value={values.policyRef || ""}
            />

            <InputField
              multiline
              name="definition"
              onChange={handleChange}
              placeholder="Definition"
              rows={2}
              value={values.definition || ""}
            />
          </FormSection>

          <FormSection label="Internal notes" icon={<NotesIcon size={20} />}>
            <InputField
              multiline
              name="internalNotes"
              onChange={handleChange}
              rows={2}
              value={values.internalNotes || ""}
            />
          </FormSection>
        </Box>

        {/* end form */}

        <div className={classes.modalFooter}>
          {handleDelete && (
            <Button
              onClick={() => {
                handleDelete();
                handleClose();
              }}
            >
              Delete
            </Button>
          )}
          <Button type="submit">{submitText}</Button>
        </div>
      </form>
    </Modal>
  );
};

const Response = ({
  i,
  responses,
  response,
  handleChange,
  setFieldValue,
  showVal
}) => {
  const classes = useStyles();
  return (
    <Box>
      <Grid
        alignItems="center"
        container
        justify="space-between"
        key={response.id}
        spacing={1}
        wrap="nowrap"
      >
        <Grid item className={classes.grow}>
          <InputField
            autoFocus={!!response.$autoFocus}
            name={`responses[${i}].text`}
            onChange={handleChange}
            placeholder={`Response ${i + 1}`}
            type="text"
            value={response.text}
          />
        </Grid>

        {showVal && (
          <Grid item className={classes.shrink}>
            <InputField
              className="value"
              name={`responses[${i}].val`}
              onChange={handleChange}
              placeholder="Value"
              type="text"
              value={showVal ? response.val : ""}
              required={showVal}
            />
          </Grid>
        )}

        <Grid item className={classes.grow}>
          <SelectField
            name={`responses[${i}].flag`}
            native
            onChange={handleChange}
            value={response.flag || ""}
          >
            {response.flag ? (
              <option value={""}>remove flag</option>
            ) : (
              <option disabled={true} value={""}>
                pick flag...
              </option>
            )}

            <optgroup label="Planning Permission">
              {Object.values(flags.planningPermissionFlags).map(f => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </optgroup>

            <optgroup label="Listed Buildings">
              {Object.values(flags.listedBuildingFlags).map(f => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </optgroup>
          </SelectField>
        </Grid>
        <Grid item className={classes.shrink}>
          <IconButton
            className={classes.deleteIcon}
            onClick={e => {
              e.preventDefault();
              setFieldValue(
                "responses",
                responses.filter(r => r.id !== response.id)
              );
            }}
            // disabled={values.responses.length === 1}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

const Responses = ({ responses, handleChange, setFieldValue, showVals }) => (
  <FormSection label="Responses" icon={<MessageIcon size={20} />}>
    <Box mb={1}>
      {responses.map((response, i) => (
        <Response
          key={response.id}
          i={i}
          responses={responses}
          response={response}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          showVal={showVals}
        />
      ))}
    </Box>
    <Button
      fullWidth
      onClick={e => {
        e.preventDefault();
        setFieldValue(
          "responses",
          responses.concat({
            id: guid(),
            text: "",
            $autoFocus: true
          })
        );
      }}
    >
      Add Response
    </Button>
  </FormSection>
);

export const NewStatement: React.FC<INewStatement> = ({
  beforeId,
  handleClose,
  responseId
}) => {
  return (
    <StatementForm
      beforeId={beforeId}
      handleClose={handleClose}
      responseId={responseId}
      submitText="Create Statement"
    />
  );
};

export const EditStatement: React.FC<IEditStatement> = ({
  data,
  handleClose,
  handleDelete,
  responseId
}) => {
  return (
    <StatementForm
      data={data}
      handleClose={handleClose}
      handleDelete={handleDelete}
      responseId={responseId}
      submitText="Update Statement"
    />
  );
};
