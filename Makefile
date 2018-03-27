# simple build system for a typescript driven Google Apps Script project

.SUFFIXES:

PROJECT := ts-drive

SOURCE_DIR := ./src
BUILD_DIR  := ./build
CLASP_DIR  := ./clasp

TARGET := $(CLASP_DIR)/$(PROJECT)

SOURCE_FILES = $(shell find $(SOURCE_DIR) -name '*.ts')
BUILD_FILES = $(shell find $(BUILD_DIR) -name '*.js' ! -path '$(BUILD_DIR)/$(PROJECT).js')
DECL_FILES = $(shell find $(BUILD_DIR) -name '*.d.ts')

default : tsc

tsc : $(SOURCE_FILES)
	@echo "---   compiling       ---"
	tsc

cat : tsc
	@echo "---   concatenating   ---"
	@echo "$(BUILD_DIR)/$(PROJECT).js $(BUILD_FILES) > $(CLASP_DIR/PROJECT).js"
	@cat -s $(BUILD_DIR)/$(PROJECT).js $(BUILD_FILES) > $(CLASP_DIR)/$(PROJECT).js
	@echo "$(DECL_FILES) > $(CLASP_DIR)/$(PROJECT).d.ts"
	@echo '///<reference types="google-apps-script" />' | cat -s - $(DECL_FILES) > $(CLASP_DIR)/$(PROJECT).d.ts

push : cat
	@echo "---   pushing         ---"
	cd $(CLASP_DIR) && clasp push

clean :
	@rm -rfv $(BUILD_DIR)/*
