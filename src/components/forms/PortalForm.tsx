// import { guid } from "@bentobots/utils";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import React from "react";
import { AlignLeft as MenuIcon } from "react-feather";
import { Link } from "react-navi";
import { v4 as guid } from "uuid";

import { TYPES, api } from "../../lib/store";
import useForm from "../../lib/useForm";
import FormSection from "./components/FormSection";
import InputField from "./components/InputField";
import SelectField from "./components/SelectField";
import { useStyles } from "./form";
import { filterValues } from "./StatementForm";

type IEditPortal = {
  data;
  handleClose?;
  handleDelete?;
  showOriginal?: boolean;
};

type INewPortal = {
  beforeId?: string;
  handleClose?;
  responseId?: string;
  portals?;
};

type IPortalForm = {
  beforeId?: string;
  data?;
  handleClose;
  handleDelete?;
  submitText: string;
  responseId?: string;
  portals?;
};

const PortalForm: React.FC<IPortalForm> = ({
  beforeId = null,
  data = {},
  handleClose,
  handleDelete,
  responseId = null,
  submitText,
  portals = []
}) => {
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

  const { values, handleChange, handleSubmit } = useForm(
    { ...defaults, ...data },
    v => {
      const portalValues = filterValues(v);

      portalValues.$t = TYPES.Portal;

      const { id = guid(), ...portal } = portalValues;
      const { flow, connectNodes, addNode, setNode } = api.getState();

      if (portalValues.flowId) {
        connectNodes(responseId, portalValues.flowId, beforeId);
      } else if (flow.nodes[id]) {
        // update statement

        setNode(id, portal);
      } else {
        // create statement
        addNode({ id, ...portal }, responseId, beforeId);
      }

      handleClose();

      // set(state => {
      //   const { id = guid(), ...portal } = portalValues;

      //   if (portalValues.flowId) {
      //     state.flow.edges.push([responseId, portalValues.flowId]);
      //   } else {
      //     if (!state.flow.nodes[id]) {
      //       // (new portal)

      //       const edge = [responseId, id];

      //       if (beforeId) {
      //         const i = state.flow.edges.findIndex(
      //           // src === responseId &&
      //           ([src, tgt]) => tgt === beforeId
      //         );
      //         state.flow.edges.splice(i, 0, edge);
      //       } else {
      //         state.flow.edges.push(edge);
      //       }

      //     } else {
      //       // (existing portal)
      //     }

      //     state.flow.nodes[id] = {
      //       $t: TYPES.Portal,
      //       name: portal.text || null
      //     };
      //   }
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
              autoFocus
              name="text"
              onChange={handleChange}
              placeholder="Portal name"
              rows={2}
              value={values.text || ""}
              disabled={!!values.flowId}
              required={!values.flowId}
            />
          </FormSection>
        </Box>

        {portals.length > 0 && (
          <Box px={4} pt={4} className={classes.formContainer}>
            <p style={{ marginBottom: "2em" }}>Or pick an existing Flow</p>

            <FormSection label={false} icon={<MenuIcon size={20} />}>
              <SelectField
                disabled={!!values.text}
                name="flowId"
                native
                onChange={handleChange}
                required={!values.text}
                value={values.flowId || ""}
              >
                {values.flowId ? (
                  <option value={""}>deselect</option>
                ) : (
                  <option disabled={true} value={""}>
                    pick flow...
                  </option>
                )}

                {portals.map(({ id, name }) => (
                  // <MenuItem key={id} value={id}>
                  // {name}
                  // </MenuItem>
                  <option value={id} key={id}>
                    {name}
                  </option>
                ))}
              </SelectField>
            </FormSection>
          </Box>
        )}

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

export const NewPortal: React.FC<INewPortal> = ({
  beforeId,
  handleClose,
  portals,
  responseId
}) => {
  return (
    <PortalForm
      beforeId={beforeId}
      handleClose={handleClose}
      portals={portals}
      responseId={responseId}
      submitText="Create Portal"
    />
  );
};

export const EditPortal: React.FC<IEditPortal> = ({
  data,
  handleClose,
  handleDelete
}) => {
  return (
    <PortalForm
      data={data}
      handleClose={handleClose}
      handleDelete={handleDelete}
      submitText="Update Portal"
    />
  );
};
