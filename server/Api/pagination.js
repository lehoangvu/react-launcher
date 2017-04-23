var pagination = {
    init: function(page, limit) {
        return {
            from: limit * (page - 1)
        }
    }
}
module.exports = pagination;