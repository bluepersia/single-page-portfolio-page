document.querySelector ('.form').addEventListener ('submit', handleSubmit);

function handleSubmit (e)
{
    e.preventDefault ();

    const inputs = e.target.querySelectorAll('.textfield_wrapper');

    let err;
    inputs.forEach (el =>
        {

            el.classList.remove ('invalid');
            err = checkInput (el.querySelector ('input,textarea'));

            if (err)
                {
                    el.querySelector ('.textfield_error').textContent = err;
                    el.classList.add ('invalid');
                }

        });

    if (err)
        return;
    
    inputs.forEach (el => el.querySelector ('input,textarea').value='');
}


function checkInput (input)
{
    let err = '';
    if (input.dataset.required)
        err = checkRequired (input.value);

    if (err)
        return err;

    if (input.dataset.minlength)
        err = checkMinlength (input.value, input.dataset.minlength);

    if (err)
        return err;

    if (input.dataset.maxlength)
        err = checkMaxlength (input.value, input.dataset.maxlength);

    if (err)
        return err;

    if (input.dataset.isemail)
        err = checkEmail (input.value);

    return err;
}



function checkRequired (val) 
{
    return val === '' ? 'Is required' : "";
}

function checkMinlength (val, minlength)
{   
    return val.length >= minlength ? '' : `Must be at least ${minlength} characters`;
}

function checkMaxlength (val, maxlength)
{
    return val.length <= maxlength ? '' : `Must be less or equal than ${maxlength} characters`
}


function checkEmail (val)
{
    return val.match (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) ? '' : 'Must be a valid email'
}