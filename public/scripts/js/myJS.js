$('#gameTab a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
    // $(this).toggle("active")
    console.log(this)
})