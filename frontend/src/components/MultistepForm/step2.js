import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { COUNTRY_LIST } from '../../helper/constants';

const Step2 = (props) => {
  const handleChange = (e) => {
    props.updateStore({
      ...props.getStore(),
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="step step3">
      <div className="row">
        <form id="Form" className="form-horizontal">
          <FormControlLabel
            className="mb-4"
            control={
              <Checkbox
                name="isAnonymous"
                checked={props.getStore().isAnonymous}
                onChange={(e) =>
                  props.updateStore({
                    ...props.getStore(),
                    isAnonymous: e.target.checked,
                  })
                }
              />
            }
            label="Donate anonymously"
          />
          {!props.getStore().isAnonymous && (
            <div className="form-group content form-block-holder mb-4">
              <label className="control-label col-md-6">Full Name</label>
              <div>
                <input
                  name="fullName"
                  autoComplete="off"
                  type="text"
                  className="form-control"
                  required
                  defaultValue={''}
                  value={props.getStore().fullName}
                  onChange={handleChange}
                />
              </div>
              <label className="control-label col-md-6">Email</label>
              <div>
                <input
                  name="email"
                  autoComplete="off"
                  type="text"
                  className="form-control"
                  required
                  defaultValue={''}
                  value={props.getStore().email}
                  onChange={handleChange}
                />
              </div>
              <label className="control-label col-md-6">Country</label>
              <div>
                <select
                  id="country"
                  name="country"
                  className="form-control"
                  value={props.getStore().country}
                  onChange={handleChange}
                  defaultValue=" "
                >
                  {Object.entries(COUNTRY_LIST).map((country) => (
                    <option value={country[0]}>{country[1]}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
export default Step2;
