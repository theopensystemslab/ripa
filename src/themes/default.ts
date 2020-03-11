import { createMuiTheme } from "@material-ui/core/styles";
import { defaultsDeep } from "lodash-es";

// see default values here https://material-ui.com/customization/default-theme

const themePalette = {
  primary: {
    main: "#038521", // basically black
    bodyText: "#141414",
    contrastText: "#fff"
  },
  secondary: {
    main: "#141414",
    contrastText: "#fff"
  },
  grey: {
    main: "#999999"
  },
  error: {
    main: "#E61E17"
  },
  warning: {
    main: "#FA9507"
  },
  info: {
    main: "rgba(33, 133, 208, 0.2)",
    contrastText: "#242424"
  },
  success: {
    main: "#2185D0"
  },
  text: {
    secondary: "rgba(0,0,0,0.45)"
  },
  background: {
    main: "#F7F7F8"
  }
};

const defaultTheme = createMuiTheme();
const {
  breakpoints,
  typography: { pxToRem }
} = defaultTheme;

const _default = {
  palette: themePalette,
  status: {
    danger: "orange"
  },
  typography: {
    fontFamily:
      "'Inter UI', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
    button: {
      textTransform: "none"
    },
    useNextVariants: true
  },
  shape: {
    borderRadius: 0
  },
  props: {
    // changes global prop defaults for material ui components
    MuiPaper: {
      elevation: 0
    },
    MuiTypography: {
      color: "inherit"
    },
    MuiButton: {
      elevation: 0
    },
    MuiIconButton: {
      color: "inherit"
    },
    MuiButtonBase: {
      elevation: 0
    },
    MuiCard: {
      elevation: 0
    },
    MuiInput: {
      disableUnderline: true
    },
    MuiExpansionPanel: {
      elevation: 0
    },
    MuiCheckbox: {
      disableRipple: true
    },
    MuiInputLabel: {
      shrink: true
    }
  },
  overrides: {
    // styling overrides for specific material UI components
    MuiTypography: {
      root: {
        fontSize: "inherit",
        color: "currentColor",
        lineHeight: 1.5,
        "& a": {
          fontWeight: 700,
          color: "currentColor",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline"
          }
        },
        "& em": {
          fontStyle: "italic"
        }
      },
      gutterBottom: {
        marginBottom: "1em"
      },
      h1: {
        fontSize: pxToRem(36),
        fontWeight: 400,
        "&$gutterBottom": {
          marginBottom: "0.5em"
        },
        [breakpoints.up("xs")]: {
          fontSize: pxToRem(48)
        }
      },
      h2: {
        fontSize: pxToRem(24),
        fontWeight: 600,
        lineHeight: 1.5,
        letterSpacing: "0.005em",
        color: "currentColor",
        "& strong": {
          fontWeight: 700
        },
        "&$gutterBottom": {
          marginBottom: "0.5em"
        },
        [breakpoints.up("sm")]: {
          fontSize: pxToRem(28)
        },
        [breakpoints.up("lg")]: {
          fontSize: pxToRem(36)
        }
      },
      h3: {
        fontSize: pxToRem(22),
        fontWeight: 400,
        lineHeight: 1.35,
        "&$gutterBottom": {
          marginBottom: "0.5em"
        },
        "& strong": {
          fontWeight: 700
        },
        [breakpoints.up("sm")]: {
          fontSize: pxToRem(26)
        },
        [breakpoints.up("md")]: {
          fontSize: pxToRem(34)
        }
      },
      h4: {
        fontSize: pxToRem(21),
        fontWeight: 400,
        lineHeight: 1.5,
        "& strong": {
          fontWeight: 700
        },
        [breakpoints.up("sm")]: {
          fontSize: pxToRem(24)
        }
      },
      h5: {
        fontSize: pxToRem(18),
        fontWeight: 700,
        [breakpoints.up("sm")]: {
          fontSize: pxToRem(20)
        }
      },
      h6: {
        fontSize: pxToRem(18),
        fontWeight: 400,
        [breakpoints.up("sm")]: {
          fontSize: pxToRem(20)
        }
      },
      subtitle1: {
        fontSize: pxToRem(18),
        fontWeight: 700
      },
      subtitle2: {
        fontSize: pxToRem(18),
        fontWeight: 400,
        "& strong": {
          fontWeight: 700
        }
      },
      body1: {
        fontSize: pxToRem(17),
        fontWeight: 500
      },
      body2: {
        fontSize: pxToRem(16),
        fontWeight: 400,
        "& strong": {
          fontWeight: 700
        }
      },
      caption: {
        fontSize: pxToRem(12),
        fontWeight: 400,
        color: themePalette.grey.main,
        lineHeight: 1.5
      }
    },
    MuiToolbar: {
      gutters: {
        [breakpoints.up("sm")]: {
          paddingLeft: 16,
          paddingRight: 16
        }
      }
    },
    MuiButton: {
      root: {
        borderRadius: 0,
        textTransform: "none",
        boxShadow: "none",
        fontSize: 16,
        fontWeight: 500
      },
      text: {
        backgroundColor: "transparent",
        color: "#888",
        textTransform: "none"
      },
      textPrimary: {
        color: "#000",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.08)"
        }
      },
      sizeLarge: {
        padding: "16px 24px",
        fontSize: 20
      },
      contained: {
        boxShadow: "none",
        "&:hover, &:active, &:focus": {
          boxShadow: "none"
        }
      },
      containedPrimary: {
        backgroundColor: "#000",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#333 !important"
        }
      }
    },
    MuiChip: {
      root: {
        height: 36,
        borderRadius: 18,
        color: "#ffffff"
      },
      label: {
        paddingLeft: 16,
        paddingRight: 16,
        color: "#ffffff"
      },
      deleteIcon: {
        width: 20,
        marginRight: 8,
        fill: "#ffffff"
      }
    },
    MuiIconButton: {
      root: {
        height: 36,
        width: 36,
        padding: 6,
        "& svg": {
          pointerEvents: "none"
        }
      }
    },
    MuiCircularProgress: {
      circle: {
        strokeLinecap: "round"
      }
    },
    MuiInput: {
      root: {
        color: "currentColor",
        backgroundColor: "transparent",
        boxSizing: "border-box",
        "&:hover": {
          boxShadow: "inset 0 0 0 1px #ddd"
        },
        "&$focused": {
          backgroundColor: "rgba(200,200,200,0.2)",
          boxShadow: "inset 0 0 0 1px #ccc"
        }
      },
      input: {
        height: 40,
        border: "1px solid currentColor",
        padding: "8px",
        boxSizing: "border-box",
        fontSize: 16,
        lineHeight: 1.429
      },
      multiline: {
        padding: 0,
        border: 0,
        "&:hover, &:focus": {
          border: 0
        },
        "& textarea": {
          height: "auto"
        }
      }
    },
    MuiInputLabel: {
      root: {
        color: "currentColor",
        fontSize: "14px",
        cursor: "text",
        "&$error": {
          color: "currentColor"
        },
        "&$focused": {
          color: "currentColor"
        }
      },
      animated: {
        transitionProperty: "transform, color",
        transitionDuration: "200ms, 350ms"
      },
      shrink: {
        transform: "translate(0) scale(1)",
        color: "currentColor",
        marginBottom: 10,
        "& + .MuiInput-formControl": {
          marginTop: 24
        }
      },
      formControl: {
        transform: "translate(8px, 27px) scale(1)",
        zIndex: "10"
      }
    },
    MuiInputAdornment: {
      root: {
        padding: "9px 8px",
        margin: "3px !important",
        color: "#000",
        backgroundColor: "#fff",
        maxHeight: "100%",
        height: 30,
        lineHeight: 1,
        display: "block",
        fontSize: 12,
        whiteSpace: "nowrap"
      }
    },
    MuiFormHelperText: {
      root: {
        color: "currentColor"
      }
    },
    MuiExpansionPanel: {
      root: {
        // border: "1px solid #ECECEC",
        backgroundColor: "#f3f3f3",
        margin: "0 0 3px",
        "&:before": {
          display: "none"
        },
        "&$expanded": {
          margin: "0 0 3px",
          "&:last-child": {
            marginBottom: 3
          }
        }
      }
    },
    MuiExpansionPanelDetails: {
      root: {
        fontSize: 16
      }
    },
    MuiSwitch: {
      root: {
        color: "currentColor",
        "& $switchBase": {
          color: "currentColor",
          "&$checked": {
            transform: "translateX(11px)",
            "& + $bar": {
              opacity: 1,
              color: "currentColor",
              borderColor: "currentColor",
              backgroundColor: "transparent"
            }
          },
          transition: "transform 0.2s ease"
        }
      },
      icon: {
        width: 15,
        height: 15,
        marginLeft: -3,
        marginTop: -2,
        backgroundColor: "#bbb",
        boxShadow: "none",
        transition: "background-color 0.2s ease"
      },
      iconChecked: {
        backgroundColor: "currentColor",
        boxShadow: "none"
      },
      bar: {
        color: "currentColor",
        borderRadius: 12,
        width: 36,
        height: 24,
        boxSizing: "border-box",
        marginTop: -13,
        marginLeft: -21,
        border: "solid 2px",
        borderColor: "#bbb",
        backgroundColor: "transparent !important",
        opacity: 1
      }
    },
    MuiTabs: {
      indicator: {
        bottom: "auto",
        top: 0
      }
    },
    MuiTab: {
      root: {
        "&$selected": {
          background: "#fff"
        }
      },
      label: {
        fontSize: 18,
        fontWeight: 700
      }
    },
    MuiTooltip: {
      tooltip: {
        fontSize: 14,
        opacity: 1,
        backgroundColor: "#000"
      }
    },
    MuiExpansionPanelSummary: {
      root: {
        fontSize: "1.25rem",
        "&$expanded": {
          minHeight: "48px"
        }
      },
      content: {
        fontSize: "1.25rem",
        lineHeight: "2rem",
        margin: "1rem 0",
        "&$expanded": {
          margin: "1rem 0",
          minHeight: "0"
        }
      }
    }
  }
};

export default createMuiTheme(defaultsDeep(_default));
