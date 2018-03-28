# simple build system for a typescript driven Google Apps Script project

.SUFFIXES:

PROJECT := ts-drive

SOURCE_DIR := ./src
BUILD_DIR  := ./build
CLASP_DIR  := ./clasp

# we manually put '$(PROJECT).$ext' at the front because it should fail if it does not exist
SOURCE_FILES = $(SOURCE_DIR)/$(PROJECT).ts $(shell find $(SOURCE_DIR) -name '*.ts' ! -path '$(SOURCE_DIR)/$(PROJECT).ts')
BUILD_FILES = $(BUILD_DIR)/$(PROJECT).js $(shell find $(BUILD_DIR) -name '*.js' ! -path '$(BUILD_DIR)/$(PROJECT).js')
DECL_FILES = $(BUILD_DIR)/$(PROJECT).d.ts $(shell find $(BUILD_DIR) -name '*.d.ts' ! -path '$(BUILD_DIR)/$(PROJECT).d.ts')

# @TODO: do some more sane compiling with dependencies?

default : tsc

tsc :
	@echo "---   compiling       ---"
	@tsc

cat : tsc
	@echo "---   concatenating   ---"
	@echo "$(BUILD_FILES) > $(CLASP_DIR)/$(PROJECT).js"
	@cat -s $(BUILD_FILES) > $(CLASP_DIR)/$(PROJECT).js
	@echo "$(DECL_FILES) > $(CLASP_DIR)/$(PROJECT).d.ts"
	@echo '///<reference types="google-apps-script" />' | cat -s - $(DECL_FILES) > $(CLASP_DIR)/$(PROJECT).d.ts

commit : cat
	@echo "---   commiting         ---"
	@git add -A
	@git commit -a
	@echo "---   pushing           ---"
	@git push
	@echo "---   clasp             ---"
	@cd $(CLASP_DIR) && clasp push

tag : cat
	@echo "---   commiting         ---"
	@git add -A
	@git commit -a
	@echo '---   tagging           ---'
	@git tag -a $(word 2,$^)
	@echo "---   pushing           ---"
	@git push
	@echo "---   clasp             ---"
	@cd $(CLASP_DIR) && clasp push

push : cat
	@echo "---   pushing         ---"
	@git push
	@echo "---   clasp           ---"
	@cd $(CLASP_DIR) && clasp push

all : push

clean :
	@rm -rfv $(BUILD_DIR)/*
	@rm -rfv $(CLASP_DIR)/$(PROJECT).{j,d.t}s
