# Variables
NAME ?= MyModel

.PHONY: create

create:
	@chmod +x scripts/create_model.sh
	@./scripts/create_model.sh $(filter-out $@,$(MAKECMDGOALS))

# This line stops make from trying to "run" the arguments as commands
%:
	@: