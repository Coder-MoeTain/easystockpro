<template>
  <div class="main-content">
    <breadcumb :page="$t('PaymentMethods')" :folder="$t('Settings')"/>

    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>
    <b-card class="wrapper" v-if="!isLoading">
      <vue-good-table
        mode="remote"
        :columns="columns"
        :search-options="{
            enabled: true,
            placeholder:'search table'
          }"
        :totalRows="totalRows"
        :rows="payment_methods"
        @on-page-change="onPageChange"
        @on-per-page-change="onPerPageChange"
        @on-sort-change="onSortChange"
        @on-search="onSearch"
        :select-options="{ 
          enabled: true ,
          clearSelectionText: '',
        }"
        @on-selected-rows-change="selectionChanged"
        :pagination-options="{
        enabled: true,
        mode: 'records',
        nextLabel: 'next',
        prevLabel: 'prev',
      }"
        styleClass="table-hover tableOne vgt-table"
      >
        <div slot="selected-row-actions">
          <button class="btn btn-danger btn-sm" @click="delete_by_selected()">{{$t('Del')}}</button>
        </div>
        <div slot="table-actions" class="mt-2 mb-3">
          <b-button
            @click="New_PaymentMethod()"
            class="btn-rounded"
            variant="btn btn-primary btn-icon m-1"
          >
            <i class="i-Add"></i>
            {{$t('Add')}}
          </b-button>
        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'actions'">
            <a @click="Edit_PaymentMethod(props.row)" title="Edit" v-b-tooltip.hover>
              <i class="i-Edit text-25 text-success"></i>
            </a>
            <a title="Delete" v-b-tooltip.hover @click="Remove_PaymentMethod(props.row.id)">
              <i class="i-Close-Window text-25 text-danger"></i>
            </a>
          </span>
          <span v-else-if="props.column.field == 'is_active'">
            <b-badge :variant="props.row.is_active == 1 ? 'success' : 'danger'">
              {{ props.row.is_active == 1 ? $t('Actif') : $t('Inactif') }}
            </b-badge>
          </span>
        </template>
      </vue-good-table>
    </b-card>
    <validation-observer ref="Create_PaymentMethod">
      <b-modal hide-footer size="md" id="New_PaymentMethod" :title="editmode?$t('Edit'):$t('Add')">
        <b-form @submit.prevent="Submit_PaymentMethod">
          <b-row>
            <!-- Name Payment Method -->
            <b-col md="12">
              <validation-provider
                name="Name Payment Method"
                :rules="{ required: true , min:2}"
                v-slot="validationContext"
              >
                <b-form-group :label="$t('Paymentchoice') + ' ' + '*'">
                  <b-form-input
                    :placeholder="$t('Enter_Payment_Method_Name')"
                    :state="getValidationState(validationContext)"
                    aria-describedby="Name-feedback"
                    label="Name"
                    v-model="payment_method.name"
                  ></b-form-input>
                  <b-form-invalid-feedback id="Name-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Is Active -->
            <b-col md="12">
              <b-form-group :label="$t('Status')">
                <b-form-checkbox
                  v-model="payment_method.is_active"
                  name="is_active"
                  value="1"
                  unchecked-value="0"
                >
                  {{ $t('Actif') }}
                </b-form-checkbox>
              </b-form-group>
            </b-col>

             <b-col md="12" class="mt-3">
                <b-button variant="primary" type="submit"  :disabled="SubmitProcessing"><i class="i-Yes me-2 font-weight-bold"></i> {{$t('submit')}}</b-button>
                  <div v-once class="typo__p" v-if="SubmitProcessing">
                    <div class="spinner sm spinner-primary mt-3"></div>
                  </div>
            </b-col>

          </b-row>
        </b-form>
      </b-modal>
    </validation-observer>
  </div>
</template>

<script>
import NProgress from "nprogress";

export default {
  metaInfo: {
    title: "Payment Methods"
  },
  data() {
    return {
      isLoading: true,
      SubmitProcessing:false,
      serverParams: {
        columnFilters: {},
        sort: {
          field: "id",
          type: "desc"
        },
        page: 1,
        perPage: 10
      },
      selectedIds: [],
      totalRows: "",
      search: "",
      limit: "10",
      payment_methods: [],
      editmode: false,
      payment_method: {
        id: "",
        name: "",
        is_active: 1
      }
    };
  },

  computed: {
    columns() {
      return [
        {
          label: this.$t("Paymentchoice"),
          field: "name",
          tdClass: "text-left",
          thClass: "text-left"
        },
        {
          label: this.$t("Status"),
          field: "is_active",
          tdClass: "text-center",
          thClass: "text-center",
          sortable: false
        },
        {
          label: this.$t("Action"),
          field: "actions",
          html: true,
          tdClass: "text-right",
          thClass: "text-right",
          sortable: false
        }
      ];
    }
  },

  methods: {
    //---- update Params Table
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },

    //---- Event Page Change
    onPageChange({ currentPage }) {
      if (this.serverParams.page !== currentPage) {
        this.updateParams({ page: currentPage });
        this.Get_PaymentMethods(currentPage);
      }
    },

    //---- Event Per Page Change
    onPerPageChange({ currentPerPage }) {
      if (this.limit !== currentPerPage) {
        this.limit = currentPerPage;
        this.updateParams({ page: 1, perPage: currentPerPage });
        this.Get_PaymentMethods(1);
      }
    },

    //---- Event Select Rows
    selectionChanged({ selectedRows }) {
      this.selectedIds = [];
      selectedRows.forEach((row, index) => {
        this.selectedIds.push(row.id);
      });
    },

    //---- Event on SortChange
    onSortChange(params) {
      this.updateParams({
        sort: {
          type: params[0].type,
          field: params[0].field
        }
      });
      this.Get_PaymentMethods(this.serverParams.page);
    },

    //---- Event on Search
    onSearch(value) {
      this.search = value.searchTerm;
      this.Get_PaymentMethods(this.serverParams.page);
    },

    //---- Validation State Form
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },

    //------------- Submit Validation Create & Edit Payment Method
    Submit_PaymentMethod() {
      this.$refs.Create_PaymentMethod.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            this.$t("Please_fill_the_form_correctly"),
            this.$t("Failed")
          );
        } else {
          if (!this.editmode) {
            this.Create_PaymentMethod();
          } else {
            this.Update_PaymentMethod();
          }
        }
      });
    },

    //------ Toast
    makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },

    //------------------------------ Modal (create Payment Method) -------------------------------\\
    New_PaymentMethod() {
      this.reset_Form();
      this.editmode = false;
      this.$bvModal.show("New_PaymentMethod");
    },

    //------------------------------ Modal (Update Payment Method) -------------------------------\\
    Edit_PaymentMethod(payment_method) {
      this.Get_PaymentMethods(this.serverParams.page);
      this.reset_Form();
      this.payment_method = payment_method;
      this.editmode = true;
      this.$bvModal.show("New_PaymentMethod");
    },

    //--------------------------Get ALL Payment Methods ---------------------------\\

    Get_PaymentMethods(page) {
      // Start the progress bar.
      NProgress.start();
      NProgress.set(0.1);
      axios
        .get(
          "payment_methods?page=" +
            page +
            "&SortField=" +
            this.serverParams.sort.field +
            "&SortType=" +
            this.serverParams.sort.type +
            "&search=" +
            this.search +
            "&limit=" +
            this.limit
        )
        .then(response => {
          this.payment_methods = response.data.payment_methods;
          this.totalRows = response.data.totalRows;

          // Complete the animation of theprogress bar.
          NProgress.done();
          this.isLoading = false;
        })
        .catch(response => {
          // Complete the animation of theprogress bar.
          NProgress.done();
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        });
    },

    //----------------------------------Create new Payment Method ----------------\\
    Create_PaymentMethod() {
      this.SubmitProcessing = true;
      axios
        .post("payment_methods", {
          name: this.payment_method.name,
          is_active: this.payment_method.is_active
        })
        .then(response => {
          this.SubmitProcessing = false;
          Fire.$emit("Event_PaymentMethod");

          this.makeToast(
            "success",
            this.$t("Successfully_Created"),
            this.$t("Success")
          );
        })
        .catch(error => {
          this.SubmitProcessing = false;
          this.makeToast("danger", this.$t("InvalidData"), this.$t("Failed"));
        });
    },

    //---------------------------------- Update Payment Method ----------------\\
    Update_PaymentMethod() {
      this.SubmitProcessing = true;
      axios
        .put("payment_methods/" + this.payment_method.id, {
          name: this.payment_method.name,
          is_active: this.payment_method.is_active
        })
        .then(response => {
          this.SubmitProcessing = false;
          Fire.$emit("Event_PaymentMethod");

          this.makeToast(
            "success",
            this.$t("Successfully_Updated"),
            this.$t("Success")
          );
        })
        .catch(error => {
          this.SubmitProcessing = false;
          this.makeToast("danger", this.$t("InvalidData"), this.$t("Failed"));
        });
    },

    //--------------------------- reset Form ----------------\\

    reset_Form() {
      this.payment_method = {
        id: "",
        name: "",
        is_active: 1
      };
    },

    //--------------------------- Remove Payment Method----------------\\
    Remove_PaymentMethod(id) {
      this.$swal({
        title: this.$t("Delete.Title"),
        text: this.$t("Delete.Text"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: this.$t("Delete.cancelButtonText"),
        confirmButtonText: this.$t("Delete.confirmButtonText")
      }).then(result => {
        if (result.value) {
          axios
            .delete("payment_methods/" + id)
            .then(() => {
              this.$swal(
                this.$t("Delete.Deleted"),
                this.$t("Delete.TitlePaymentMethod"),
                "success"
              );

              Fire.$emit("Delete_PaymentMethod");
            })
            .catch(() => {
              this.$swal(
                this.$t("Delete.Failed"),
                this.$t("Delete.Therewassomethingwronge"),
                "warning"
              );
            });
        }
      });
    },

    //---- Delete payment method by selection

    delete_by_selected() {
      this.$swal({
        title: this.$t("Delete.Title"),
        text: this.$t("Delete.Text"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: this.$t("Delete.cancelButtonText"),
        confirmButtonText: this.$t("Delete.confirmButtonText")
      }).then(result => {
        if (result.value) {
          // Start the progress bar.
          NProgress.start();
          NProgress.set(0.1);
          axios
            .post("payment_methods/delete/by_selection", {
              selectedIds: this.selectedIds
            })
            .then(() => {
              this.$swal(
                this.$t("Delete.Deleted"),
                this.$t("Delete.TitlePaymentMethod"),
                "success"
              );

              Fire.$emit("Delete_PaymentMethod");
            })
            .catch(() => {
              // Complete the animation of theprogress bar.
              setTimeout(() => NProgress.done(), 500);
              this.$swal(
                this.$t("Delete.Failed"),
                this.$t("Delete.Therewassomethingwronge"),
                "warning"
              );
            });
        }
      });
    }
  }, //end Methods

  //----------------------------- Created function-------------------

  created: function() {
    this.Get_PaymentMethods(1);

    Fire.$on("Event_PaymentMethod", () => {
      setTimeout(() => {
        this.Get_PaymentMethods(this.serverParams.page);
        this.$bvModal.hide("New_PaymentMethod");
      }, 500);
    });

    Fire.$on("Delete_PaymentMethod", () => {
      setTimeout(() => {
        this.Get_PaymentMethods(this.serverParams.page);
      }, 500);
    });
  }
};
</script>

