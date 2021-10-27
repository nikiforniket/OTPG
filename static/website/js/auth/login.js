"use strict";

// Class Definition
var KTLogin = function() {
    var _login;

    var _showForm = function(form) {
        var cls = 'login-' + form + '-on';
        var form = 'kt_login_' + form + '_form';

        _login.removeClass('login-forgot-on');
        _login.removeClass('login-signin-on');
        _login.removeClass('login-signup-on');
        _login.removeClass('login-forgotsuccess-on')
        _login.removeClass('login-signupsuccess-on')

        _login.addClass(cls);

        KTUtil.animateClass(KTUtil.getById(form), 'animate__animated animate__backInUp');
    }

    var _handleSignInForm = function() {
        var validation;
        validation = FormValidation.formValidation(
			KTUtil.getById('kt_login_signin_form'),
			{
				fields: {
					username: {
						validators: {
							notEmpty: {
								message: 'User Name is required'
							}
						}
					},
					password: {
						validators: {
							notEmpty: {
								message: 'Password is required'
							}
						}
					}
				},
				plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    submitButton: new FormValidation.plugins.SubmitButton(),
                    //defaultSubmit: new FormValidation.plugins.DefaultSubmit(), // Uncomment this line to enable normal button submit after form validation
					bootstrap: new FormValidation.plugins.Bootstrap()
				}
			}
		);

        $('#kt_login_signin_submit').on('click', function (e) {
            e.preventDefault();
            validation.validate().then(function(status) {
		        if (status == 'Valid') {
					$('#kt_login_signin_form').submit();
				} else {
					KTUtil.scrollTop();
				}
		    });
        });

        // Handle forgot button
        $('#kt_login_forgot').on('click', function (e) {
            e.preventDefault();
            _showForm('forgot');
        });

        // Handle signup
        $('#kt_login_signup').on('click', function (e) {
            e.preventDefault();
            _showForm('signup');
        });
    }

    var _handleSignUpForm = function(e) {
        var validation;
        var form = KTUtil.getById('kt_login_signup_form');

        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validation = FormValidation.formValidation(
			form,
			{
				fields: {
					username: {
						validators: {
							notEmpty: {
								message: 'User Name is required'
							}
						}
					},
					email: {
                        validators: {
							notEmpty: {
								message: 'Email address is required'
							},
                            emailAddress: {
								message: 'The value is not a valid email address'
							}
						}
					},
                    // password: {
                    //     validators: {
                    //         notEmpty: {
                    //             message: 'The password is required'
                    //         }
                    //     }
                    // },
                    // cpassword: {
                    //     validators: {
                    //         notEmpty: {
                    //             message: 'The password confirmation is required'
                    //         },
                    //         identical: {
                    //             compare: function() {
                    //                 return form.querySelector('[name="password"]').value;
                    //             },
                    //             message: 'The password and its confirm are not the same'
                    //         }
                    //     }
                    // },
                    accept_terms: {
                        validators: {
                            notEmpty: {
                                message: 'You must accept the terms and conditions'
                            }
                        }
                    },
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					bootstrap: new FormValidation.plugins.Bootstrap()
				}
			}
		);

        $('#kt_login_signup_submit').on('click', function (e) {
            e.preventDefault();

            validation.validate().then(function(status) {
		        if (status == 'Valid') {
                    let form = document.getElementById('kt_login_signup_form')
                    let create_data = new FormData(form)
                    $.ajax({
                        url:'/api/v1/user-management/sign-up/',
                        type: "post",
                        processData: false,
                        contentType: false,
                        data: create_data,
                        beforeSend: function() {
                            $('#' + e.target.id).prop('disabled', true)
                            $('#' + e.target.id).addClass($(e.target).attr('class') + ' spinner spinner-white spinner-right')
                        },
                        success: function (data) {
                            _showForm('signupsuccess')
                        },
                        error: function (error) {
                            if (error.responseJSON) {
                                LoadAjaxFieldErrorData(error, 'kt_login_signup_form')
                            } else {
                                Swal.fire({
                                    title: `${error['statusText']}. 
                                    Reload the page and try again?`,
                                    showDenyButton: true,
                                    showCancelButton: false,
                                    confirmButtonText: `Okay`,
                                    denyButtonText: 'Cancel',
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        window.location.reload();
                                    } else {
                                        return
                                    }
                                })
                            }
                        },
                        complete: function () {
                            $('#' + e.target.id).prop('disabled', false)
                            $('#' + e.target.id).removeClass('spinner spinner-white spinner-right')
                        }
                    })
				} else {
					KTUtil.scrollTop();
				}
		    });
        });

        // Handle cancel button
        $('#kt_login_signup_cancel').on('click', function (e) {
            e.preventDefault();
            _showForm('signin');
        });
    }

    var _handleForgotForm = function(e) {
        var validation;

        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validation = FormValidation.formValidation(
			KTUtil.getById('kt_login_forgot_form'),
			{
				fields: {
					email: {
						validators: {
							notEmpty: {
								message: 'Email address is required'
							},
                            emailAddress: {
								message: 'The value is not a valid email address'
							}
						}
					}
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					bootstrap: new FormValidation.plugins.Bootstrap()
				}
			}
		);

        // Handle submit button
        $('#kt_login_forgot_submit').on('click', function (e) {
            e.preventDefault();

            validation.validate().then(function(status) {
		        if (status == 'Valid') {
                    let form = document.getElementById('kt_login_forgot_form')
                    let create_data = new FormData(form)
                    jQuery.ajax({
                        url:'/api/v1/mails/forgot-password-requests/',
                        type: "post",
                        processData: false,
                        contentType: false,
                        data: create_data,
                        beforeSend: function () {
                            $('#' + e.target.id).prop('disabled', true)
                            $('#' + e.target.id).addClass($(e.target).attr('class') + ' spinner spinner-white spinner-right')
                        },
                        success: function (data) {
                            _showForm('forgotsuccess');
                        },
                        error: function (error) {
                            if (error.responseJSON) {
                                if (error.responseJSON['error'] == 'sent') {
                                    _showForm('forgotsent')
                                } else {
                                    LoadAjaxFieldErrorData(error, 'kt_login_forgot_form')
                                }
                            } else {
                                Swal.fire({
                                    title: `${error['statusText']}. 
                                    Reload the page and try again?`,
                                    showDenyButton: true,
                                    showCancelButton: false,
                                    confirmButtonText: `Okay`,
                                    denyButtonText: 'Cancel',
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        window.location.reload();
                                    } else {
                                        return
                                    }
                                })
                            }
                        },
                        complete: function () {
                            $('#' + e.target.id).prop('disabled', false)
                            $('#' + e.target.id).removeClass('spinner spinner-white spinner-right')
                        }
                    })
                    
				} else {
					KTUtil.scrollTop();
				}
		    });
        });

        // Handle cancel button
        $('#kt_login_forgot_cancel').on('click', function (e) {
            e.preventDefault();

            _showForm('signin');
        });
    }

    // Public Functions
    return {
        // public functions
        init: function() {
            _login = $('#kt_login');

            _handleSignInForm();
            _handleSignUpForm();
            _handleForgotForm();
        }
    };
}();

$('#kt_login_signin_form input').on('input', function() {
	$('.ajax-error').text('')
})

$('#kt_login_signup_form input').on('input', function() {
	$('.ajax-error').text('')
})

$('#kt_login_forgot_form input').on('input', function() {
	$('.ajax-error').text('')
})

// Class Initialization
jQuery(document).ready(function() {
    KTLogin.init();
});
