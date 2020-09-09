import React from "react";
import {
  TextField,
  Grid,
  FormLabel,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  InputLabel,
  Select,
  Checkbox,
  Container,
  Button,
  FormHelperText,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import parseJoyErrors from "./utils/parseJoyErrors";
import schema from "./schema";

class ExForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        fullname: "",
        email: "",
        mobile: "",
        city: "",
        gender: "male",
        departamentId: undefined,
        isParament: false,
        date: new Date(),
      },
      validate: {},
      error: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  handleChange(e) {
    const { value, name } = e.target;
    this.setState({
      ...this.state,
      form: { ...this.state.form, [name]: value },
    });
  }

  handleChangeChek(e) {
    const { checked, name } = e.target;
    this.setState({
      ...this.state,
      form: { ...this.state.form, [name]: checked },
    });
  }
  handleChangeDate(value, name) {
    this.setState({
      ...this.state,
      form: { ...this.state.form, [name]: value },
    });
  }

  handleError(value, name) {
    this.setState({ ...this.state, [name]: value, error: true });
  }

  handleReset() {
    this.setState({ ...this.state, validate: "", error: false });
  }
  handleSubmit() {
    const { error } = schema.validate(this.state.form, { abortEarly: false });
    if (error) {
      this.handleError(parseJoyErrors(error.details), "validate");
    } else {
      this.handleReset();
      console.log(this.state);
    }
  }

  render() {
    return (
      <>
        <Container maxWidth="sm">
          <form autoComplete="off">
            <div>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={
                      this.state.validate.fullname ? this.state.error : null
                    }
                    helperText={
                      this.state.validate.fullname &&
                      this.state.validate.fullname.message
                    }
                    id="fullname"
                    name="fullname"
                    label="Nombre"
                    value={this.state.form.fullname}
                    onChange={this.handleChange}
                  />
                  <TextField
                    error={this.state.validate.email ? this.state.error : null}
                    helperText={
                      this.state.validate.email &&
                      this.state.validate.email.message
                    }
                    id="email"
                    name="email"
                    label="Email"
                    value={this.state.form.email}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={this.state.validate.mobile ? this.state.error : null}
                    helperText={
                      this.state.validate.mobile &&
                      this.state.validate.mobile.message
                    }
                    id="mobile"
                    name="mobile"
                    label="mobile"
                    value={this.state.form.mobile}
                    onChange={this.handleChange}
                  />
                  <TextField
                    error={this.state.validate.city ? this.state.error : null}
                    helperText={
                      this.state.validate.city &&
                      this.state.validate.city.message
                    }
                    id="city"
                    name="city"
                    label="city"
                    value={this.state.form.city}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel>Genero</FormLabel>
                    <RadioGroup
                      row
                      name="gender"
                      value={this.state.form.gender}
                      onChange={this.handleChange}
                    >
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Hombre"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Mujer"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Otro"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    error={
                      this.state.validate.departamentId
                        ? this.state.error
                        : null
                    }
                  >
                    <InputLabel id="helper-label">Age</InputLabel>
                    <Select
                      labelId="departamentId"
                      id="departamentId"
                      name="departamentId"
                      value={this.state.form.departamentId}
                      onChange={this.handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    {this.state.validate.departamentId && (
                      <FormHelperText>
                        {this.state.validate.departamentId.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    error={
                      this.state.validate.isParament ? this.state.error : null
                    }
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="isParament"
                          color="primary"
                          checked={this.state.form.isParament}
                          onChange={(e) => this.handleChangeChek(e)}
                        />
                      }
                      label="Checkt"
                    />
                    {this.state.validate.isParament && (
                      <FormHelperText>
                        {this.state.validate.isParament.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      label="Fecha"
                      format="MM/dd/yyyy"
                      name="date"
                      value={this.state.form.date}
                      onChange={(date, e) => this.handleChangeDate(e, "date")}
                    ></KeyboardDatePicker>
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </div>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={this.handleSubmit}
            >
              Guardar
            </Button>
          </form>
        </Container>
      </>
    );
  }
}
export default ExForm;
