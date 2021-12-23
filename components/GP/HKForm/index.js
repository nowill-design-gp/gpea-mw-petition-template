import React, { useEffect, useState } from 'react';
import { Form, withFormik } from 'formik';
import { connect } from 'react-redux';
import { Field } from '@components/Field/fields';
import { numberFormat, capitalize } from '@common/utils';
import { validation } from './validation';
import Mailcheck from 'mailcheck';
import * as signupActions from 'store/actions/action-types/signup-actions';
import * as statusActions from 'store/actions/action-types/status-actions';
import * as formActions from 'store/actions/action-types/form-actions';

import {
  FormControl,
  FormErrorMessage,
  Button,
  Box,
  Flex,
  Text,
  HStack,
  Stack,
  Select,
  Input,
  Checkbox,
  Heading,
} from '@chakra-ui/react';
import { OrangeCTA } from '@common/styles/components/formStyle';

const MyForm = (props) => {
  const {
    signup,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isLoading,
    setFieldValue,
    setWebStatus,
    values,
    formContent,
    theme,
    setSuggestion,
    initSuggestion,
    suggestion,
    numberOfResponses,
    numberOfTarget,
  } = props;
  const [birthDateYear, setBirthDateYear] = useState([]);
  const [progressNumber, setProgressNumber] = useState(0);
  const themeInterests = theme.interests;

  useEffect(() => {
    let optionYear = [];
    function fetchOptionYear() {
      const minYear = 18;
      const maxYear = 110;
      let nowYear = new Date().getFullYear();
      let targetYear = nowYear - maxYear;
      for (var i = nowYear - minYear; i >= targetYear; i--) {
        optionYear.push({ label: i, value: i.toString() });
      }
      setBirthDateYear(optionYear);
    }
    fetchOptionYear(optionYear);
    initSuggestion();
  }, []);

  useEffect(() => {
    const currentNumber = numberOfResponses;
    const currentNumberOfTarget = numberOfTarget ? numberOfTarget : 10000;
    const number =
      Math.round((currentNumber / currentNumberOfTarget) * 10000) / 100;
    if (isNaN(number)) {
      return;
    }

    const timer = () => setTimeout(() => setProgressNumber(`${number}%`), 1000);
    const timerId = timer();
    return () => {
      clearTimeout(timerId);
    };
  }, [numberOfResponses]);

  useEffect(() => {
    if (signup.submitted) {
      setWebStatus(true);
    }
  }, [signup.submitted]);

  const mailSuggestion = (value) => {
    const domains = [
      'me.com',
      'outlook.com',
      'netvigator.com',
      'cloud.com',
      'live.hk',
      'msn.com',
      'gmail.com',
      'hotmail.com',
      'ymail.com',
      'yahoo.com',
      'yahoo.com.tw',
      'yahoo.com.hk',
    ];
    const topLevelDomains = ['com', 'net', 'org'];

    if (value) {
      Mailcheck.run({
        email: value,
        domains: domains, // optional
        topLevelDomains: topLevelDomains, // optional
        // secondLevelDomains: secondLevelDomains, // optional
        // distanceFunction: superStringDistance,  // optional
        suggested: function (suggestion) {
          if (value !== suggestion.full) {
            setSuggestion(suggestion.full);
          }
        },
      });
    }
  };

  return (
    <Box>
      <Box py="8" px="4">
        <Stack spacing="4">
          {numberOfResponses && numberOfTarget ? (
            <Box>
              <Box
                borderRadius={'20px'}
                bgColor="#d2d2d2"
                h={`14px`}
                overflow={`hidden`}
              >
                {numberOfResponses && (
                  <Box
                    style={{ transition: `width 2s` }}
                    h={`14px`}
                    w={progressNumber}
                    borderRadius={4}
                    bgColor={`theme.${themeInterests}`}
                  />
                )}
              </Box>
              <Box>
                <Text color={`theme.${themeInterests}`} fontSize={'sm'} mt={2}>
                  {formContent.signed_number}:{' '}
                  <Text as="span" fontSize={'2xl'} fontWeight="bold">
                    {numberFormat(numberOfResponses)}
                  </Text>{' '}
                  / {numberFormat(numberOfTarget)}
                </Text>
              </Box>
            </Box>
          ) : null}
          <Box>
            <Heading
              fontSize={'2xl'}
              dangerouslySetInnerHTML={{ __html: formContent.form_header }}
            />
          </Box>
          <Box>
            <Text
              as="p"
              dangerouslySetInnerHTML={{ __html: formContent.form_description }}
            />
          </Box>
          <Form onSubmit={handleSubmit}>
            <Stack spacing="4">
              <Stack direction={`row`}>
                <Box flex={1}>
                  <Field
                    errors={errors.LastName}
                    touched={touched.LastName}
                    label={formContent.label_last_name}
                    name={'LastName'}
                    type={'text'}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                </Box>

                <Box flex={1}>
                  <Field
                    errors={errors.FirstName}
                    touched={touched.FirstName}
                    label={formContent.label_first_name}
                    name={'FirstName'}
                    type={'text'}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                </Box>
              </Stack>

              <Box>
                <FormControl
                  id="email"
                  isInvalid={errors.Email && touched.Email}
                >
                  <Input
                    name="Email"
                    type="email"
                    placeholder={formContent.label_email}
                    onChange={handleChange}
                    onBlur={(e) => {
                      // call the built-in handleBur
                      handleBlur(e);
                      // and do something about e
                      mailSuggestion(e.target.value);
                    }}
                    value={values.Email}
                    _placeholder={{ fontSize: 16 }}
                    size={'lg'}
                  />
                  <FormErrorMessage color="red">
                    {errors.Email}
                  </FormErrorMessage>
                  {suggestion && (
                    <Box
                      onClick={() => {
                        setFieldValue('Email', suggestion);
                        initSuggestion();
                      }}
                      pt={2}
                      pl={2}
                      cursor={`pointer`}
                    >
                      <Text fontSize={`sm`} color={`theme.${themeInterests}`}>
                        {formContent.suggestion_message} <b>{suggestion}</b>
                      </Text>
                    </Box>
                  )}
                </FormControl>
              </Box>

              <HStack align="flex-start">
                <Box>
                  <FormControl id="mobileCountryCode">
                    <Select
                      name="MobileCountryCode"
                      onChange={handleChange}
                      fontSize={'16px'}
                      size={'lg'}
                    >
                      {(formContent.mobile_country_code || []).map((d) => (
                        <option key={d.value} value={d.value}>
                          {d.label}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box flex={1}>
                  <Field
                    errors={errors.MobilePhone}
                    touched={touched.MobilePhone}
                    label={formContent.label_phone}
                    name={'MobilePhone'}
                    type="tel"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                </Box>
              </HStack>

              <Box>
                <FormControl
                  id="Birthdate"
                  isInvalid={errors.Birthdate && touched.Birthdate}
                >
                  <Select
                    onChange={handleChange}
                    fontSize={'16px'}
                    placeholder={formContent.label_year_of_birth}
                    size={'lg'}
                  >
                    {birthDateYear &&
                      birthDateYear.map((d) => (
                        <option key={d.value} value={`${d.value}-01-01`}>
                          {d.value}
                        </option>
                      ))}
                  </Select>
                  <FormErrorMessage color="red">
                    {errors.Birthdate}
                  </FormErrorMessage>
                </FormControl>
              </Box>

              <Box>
                <Flex py="2" direction={{ base: 'row' }} align={'flex-start'}>
                  <Box flex={1} mr={2} pt={1}>
                    <Checkbox
                      name="OptIn"
                      defaultChecked
                      // colorScheme={`${theme.ProjectName}`}
                      onChange={handleChange}
                    />
                  </Box>
                  <Text
                    fontSize="xs"
                    color={'gray.700'}
                    dangerouslySetInnerHTML={{
                      __html: formContent.label_newsletter,
                    }}
                  />
                </Flex>
                {/* <Flex direction={{ base: 'row' }} align={'center'}>
            <Box flex={1} mr={4}>
              <Text fontSize={'xs'}>{formContent.label_newsletter}</Text>
            </Box>
            <HStack spacing={2}>
              {(formContent.new_letter || []).map((d, i) => (
                <Button
                  key={i}
                  bgColor={d.value === values.Newsletter ? '#66cc00' : '#FFF'}
                  color={d.value === values.Newsletter ? '#FFF' : '#000'}
                  variant={`outline`}
                  fontSize={'sm'}
                  onClick={() => setFieldValue('Newsletter', d.value)}
                >
                  {d.label}
                </Button>
              ))}
            </HStack>
          </Flex> */}
              </Box>
              <Box>
                <Button {...OrangeCTA} isLoading={isLoading} type={'submit'}>
                  {formContent.submit_text}
                </Button>
              </Box>
            </Stack>
          </Form>
          {/* <Box pt={4} pb={4}>
          <Text fontSize="xs" color={'gray.700'}>
            {formContent.form_remind}
          </Text>
        </Box> */}
        </Stack>
      </Box>
    </Box>
  );
};

const MyEnhancedForm = withFormik({
  mapPropsToValues: () => ({
    Email: '',
    FirstName: '',
    LastName: '',
    MobileCountryCode: '852',
    MobilePhone: '',
    Birthdate: '',
    OptIn: true,
  }),

  validate: async (values, props) => {
    const { formContent } = props;

    return validation(values, formContent);
  },

  handleSubmit: async (values, { setSubmitting, props }) => {
    const { submitForm, theme, hiddenFormData } = props;
    const isProd = process.env.NODE_ENV === 'production';
    const fallbackValue = (d) => (d ? d : '');
    const LeadSource = `Petition - ${capitalize(theme.interests)}`;
    // TODO: Fix Access-Control-Allow-Origin issue
    const endPoint = isProd ? theme.EndpointURL : process.env.dummyEndpoint;

    const formData = {
      ...hiddenFormData,
      ...values,
      UtmMedium: fallbackValue(hiddenFormData.utm_medium),
      UtmSource: fallbackValue(hiddenFormData.utm_source),
      UtmCampaign: fallbackValue(hiddenFormData.utm_campaign),
      UtmContent: fallbackValue(hiddenFormData.utm_content),
      UtmTerm: fallbackValue(hiddenFormData.utm_term),
      CampaignId: isProd ? theme.CampaignId : '7012u000000OxDYAA0',
      LeadSource: LeadSource,
      [`Petition_Interested_In_${capitalize(theme.interests)}__c`]: true,
      CompletionURL: window.location.href ? window.location.href : '',
    };

    setSubmitting(true);
    submitForm(formData, endPoint);
  },

  displayName: 'SignupForm',
})(MyForm);

const mapStateToProps = ({ signup, hiddenForm, form, theme, status }) => {
  return {
    signup,
    hiddenFormData: hiddenForm.data,
    isLoading: signup.lastAction === signupActions.SIGN_UP,
    formContent: form.content,
    numberOfResponses: form.signupNumbers.hk?.NumberOfResponses,
    numberOfTarget: form.signupNumbers.hk?.Petition_Signup_Target__c,
    theme: theme.data,
    suggestion: form.suggestion,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (data, endPoint) => {
      dispatch({ type: signupActions.SIGN_UP, data, endPoint });
    },
    setWebStatus: (bol) => {
      dispatch({ type: statusActions.SET_FORM_SUBMITTED, data: bol });
    },
    setSuggestion: (value) => {
      dispatch({ type: formActions.SET_SUGGESTION, data: value });
    },
    initSuggestion: () => {
      dispatch({ type: formActions.INIT_SUGGESTION });
    },
  };
};

connect(mapStateToProps, mapDispatchToProps)(MyForm);

export default connect(mapStateToProps, mapDispatchToProps)(MyEnhancedForm);
