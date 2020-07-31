import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  makeStyles,
  Button,
  TextField,
} from "@material-ui/core";
import { RequestStatus } from "types";
import { ValidatorSettings } from "common";
import { ErrorView } from "./ErrorView";
import { LoadingView } from "./LoadingView";

type BeaconProvider = "lighthouse" | "prysm" | "custom";

const providerSelectOptions: { value: BeaconProvider; label: string }[] = [
  {
    value: "lighthouse",
    label: "Local DAppNode Lighthouse",
  },
  {
    value: "prysm",
    label: "Local DAppNode Prysm",
  },
  {
    value: "custom",
    label: "Custom",
  },
];

const useStyles = makeStyles((theme) => ({
  selectDescription: {
    flexGrow: 1,
  },
  selectFormControl: {
    marginTop: theme.spacing(3),
  },
  providerInput: {
    marginTop: theme.spacing(3),
  },
  bottomContainer: {
    marginTop: theme.spacing(3),
    "& > div:not(:last-child)": {
      marginBottom: theme.spacing(3),
    },
  },
}));

export function SelectBeaconProvider({
  validatorSettings,
}: {
  validatorSettings: ValidatorSettings;
}) {
  const [providerSelect, setProviderSelect] = useState<BeaconProvider>(
    providerSelectOptions[0].value
  );
  const [providerInput, setProviderInput] = useState<string>("");
  const [reqStatus, setReqStatus] = useState<RequestStatus>({});

  useEffect(() => {
    const currentOption = providerSelectOptions.find(
      (o) => o.value === validatorSettings.beaconProvider
    );
    if (currentOption) {
      setProviderSelect(currentOption.value);
    } else {
      setProviderSelect("custom");
      setProviderInput(validatorSettings.beaconProvider);
    }
  }, [validatorSettings.beaconProvider]);

  const hasChanged =
    providerSelect === "custom"
      ? providerInput && providerInput !== validatorSettings.beaconProvider
      : providerSelect !== validatorSettings.beaconProvider;

  async function changeBeaconProvider() {
    if (!hasChanged) return;
    try {
      setReqStatus({ loading: true });
      throw Error("Not implemented");
      setReqStatus({ result: "" });
    } catch (e) {
      console.log("Error on switchValidatorClient", e);
      setReqStatus({ error: e });
    }
  }

  const classes = useStyles();

  return (
    <>
      <FormControl variant="outlined" className={classes.selectFormControl}>
        <Select
          value={providerSelect}
          onChange={(e) => setProviderSelect(e.target.value as BeaconProvider)}
        >
          {providerSelectOptions.map(({ value, label }) => (
            <MenuItem value={value}>{label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {providerSelect === "custom" && (
        <TextField
          className={classes.providerInput}
          label="Beacon provider URL"
          variant="outlined"
          value={providerInput}
          onChange={(e) => setProviderInput(e.target.value)}
        />
      )}

      <div className={classes.bottomContainer}>
        {reqStatus.error && <ErrorView error={reqStatus.error} />}
        {reqStatus.loading && (
          <LoadingView
            steps={[
              "Stopping current client",
              "Migrating files",
              "Starting new client",
            ]}
          />
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={changeBeaconProvider}
          disabled={!hasChanged}
        >
          Apply changes
        </Button>
      </div>
    </>
  );
}